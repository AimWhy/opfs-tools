A utility library for simple and efficient file operations in the browser, built on [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system).

在浏览器中简单、高效操作文件的工具库，基于 [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) 构建。

In development, will reference the API design of [Bun File I/O](https://bun.sh/docs/api/file-io).

开发中，将参考 Bun File I/O 的 API 设计。

## Features

- [ ] Reading files
  - [x] create file
  - [x] text
  - [x] stream
  - [x] arrayBuffer
- [x] Random reading
  - [x] reader = file.createReader
  - [x] reader.read(bufLen, { at }
  - [x] reader.close
- Writing files
  - [x] write(dest: string, input: string)
  - [x] write(dest: string, input: ArrayBuffer | ArrayBufferView)
  - [x] write(dest: string, input: ReadableStream)
- Random writing
  - [x] writer = file.createWriter
  - [x] writer.write
  - [x] writer.flush
  - [x] writer.truncate
  - [x] writer.close
- Directories
  - [ ] readdir
  - [x] mkdir
- Basic operations
  - [x] exists
  - [ ] remove
  - [ ] copy
