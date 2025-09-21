import z from 'zod';

export const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

export function isAllowedFileType(type: string) {
  return ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].includes(type);
}

export function isFileSizeOk(file: File) {
  return file?.size <= MAX_FILE_BYTES;
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const result = reader.result as string;
      const commaIdx = result.indexOf(',');
      resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
    };
    reader.readAsDataURL(file);
  });
}
export const fileSchema = z
  .custom<FileList>()
  .refine((files) => files && files.length === 1, 'Document is required')
  .refine((files) => isAllowedFileType(files?.[0]?.type), 'Only PDF, PNG, JPEG allowed')
  .refine(
    (files) => isFileSizeOk(files?.[0]),
    `File must be ≤ ${Math.round(MAX_FILE_BYTES / (1024 * 1024))} MB`,
  );
