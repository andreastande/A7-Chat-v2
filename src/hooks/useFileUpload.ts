"use client"

import { useCallback, useState } from "react"
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone"
import { toast } from "sonner"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB per file

function messageFor(code: ErrorCode | string, file: File) {
  switch (code) {
    case "file-too-large":
      return `${file.name} is larger than 50 MB`
    case "file-too-small":
      return `${file.name} is smaller than the minimum allowed size`
    case "file-invalid-type":
      return `Unsupported file type: ${file.name}`
    case "too-many-files":
      return `Too many files selected`
    default:
      return `Could not add ${file.name}`
  }
}

export function useFileUpload() {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    }

    if (rejectedFiles.length) {
      rejectedFiles.forEach(({ file, errors }) => {
        const text = errors.map((e) => messageFor(e.code, file) || e.message).join("\n")
        toast.error(text)
      })
    }
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFileDialog,
  } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
    noClick: true,
    noKeyboard: true,
  })
  return { files, clearFiles: () => setFiles([]), getRootProps, getInputProps, isDragActive, openFileDialog }
}
