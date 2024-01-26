import { OPFSWorkerAccessHandle, createOPFSAccess } from "./access-worker"

export interface FileOpts {
  create?: boolean
  overwrite?: boolean
}

const root = await navigator.storage.getDirectory()

async function makeParent(fileName: string) {
  const paths = fileName
    .split('/')
    .filter(s => s.length > 0)
    .slice(0, -1)
  let dirHandle
  for (const p of paths) {
    dirHandle = await root.getDirectoryHandle(p, { create: true })
  }
  return dirHandle ?? root
}



export abstract class BaseFile {
  name: string

  protected initReady: Promise<void>

  protected parent: FileSystemDirectoryHandle | null = null

  protected accessHandle: OPFSWorkerAccessHandle | null = null

  #fh: FileSystemFileHandle | null = null

  constructor(filePath: string, opts: FileOpts = {}) {
    const name = filePath.split('/').at(-1)
    if (name == null || name === '') throw Error('Illegal file name')
    this.name = name

    this.initReady = this.#init(filePath, opts)
  }

  async #init(filePath: string, opts: FileOpts) {
    const dir = await makeParent(filePath)
    this.parent = dir
    this.#fh = await dir.getFileHandle(this.name, opts)

    if (opts.overwrite === true) await this.truncate(0)

    this.accessHandle = await createOPFSAccess()(filePath, this.#fh)
  }

  async getSize() {
    await this.initReady
    return await this.accessHandle?.getSize() ?? 0
  }

  async getOriginFile() {
    await this.initReady
    return await this.#fh?.getFile()
  }

  async truncate(newSize: number) {
    await this.accessHandle?.truncate(newSize)
  }

  async remove() {
    await this.close()
    await this.parent?.removeEntry(this.name)
  }

  /**
   * When a file is no longer in use, it is necessary to call the close method.
   */
  async close() {
    await this.initReady
    await this.accessHandle?.close()
  }
}