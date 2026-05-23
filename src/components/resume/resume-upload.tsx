"use client";

import { useCallback } from "react";

import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelect: (
    file: File
  ) => void;
}

export default function ResumeUpload({
  onFileSelect,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file =
        acceptedFiles[0];

      if (file) {
        onFileSelect(file);
      }
    },

    [onFileSelect]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,

    accept: {
      "application/pdf": [".pdf"],
    },

    multiple: false,
  });

  return (
    <div
      {...getRootProps()}

      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
        isDragActive
          ? "border-black bg-zinc-100"
          : "border-zinc-300"
      }`}
    >
      <input {...getInputProps()} />

      <p className="text-lg font-medium">
        Drag & drop your resume
      </p>

      <p className="text-sm text-zinc-500 mt-2">
        Upload PDF only
      </p>

    </div>
  );
}