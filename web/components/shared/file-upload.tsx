"use client";

import { useCallback, useState, type DragEvent, type ChangeEvent } from "react";
import { Upload, X, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/format";

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  files: File[];
  onFilesChange: (files: File[]) => void;
  label?: string;
  className?: string;
}

export function FileUpload({
  accept = ".pdf,.jpg,.jpeg,.png,.webp",
  maxSize = 5 * 1024 * 1024,
  maxFiles = 5,
  files,
  onFilesChange,
  label = "Seret file ke sini atau klik untuk memilih",
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndAdd = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      setError(null);

      const newFiles: File[] = [];
      for (const file of Array.from(incoming)) {
        if (files.length + newFiles.length >= maxFiles) {
          setError(`Maksimal ${maxFiles} file`);
          break;
        }
        if (file.size > maxSize) {
          setError(`${file.name} melebihi batas ukuran (${formatFileSize(maxSize)})`);
          continue;
        }
        newFiles.push(file);
      }

      if (newFiles.length > 0) {
        onFilesChange([...files, ...newFiles]);
      }
    },
    [files, maxFiles, maxSize, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      validateAndAdd(e.dataTransfer.files);
    },
    [validateAndAdd]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      validateAndAdd(e.target.files);
      e.target.value = "";
    },
    [validateAndAdd]
  );

  const removeFile = useCallback(
    (index: number) => {
      onFilesChange(files.filter((_, i) => i !== index));
      setError(null);
    },
    [files, onFilesChange]
  );

  return (
    <div className={cn("space-y-3", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <Upload className="mb-2 size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Max {formatFileSize(maxSize)} per file · {maxFiles} file
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between rounded-md border px-3 py-2"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate text-sm">{file.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0"
                onClick={() => removeFile(i)}
              >
                <X className="size-3.5" />
                <span className="sr-only">Hapus file</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
