import { z } from 'zod';
export declare const MAX_FILE_BYTES: number;
export declare function isAllowedFileType(type: string): boolean;
export declare function isFileSizeOk(file: File): boolean;
export declare function fileToBase64(file: File): Promise<string>;
export declare const fileSchema: z.ZodCustom<FileList, FileList>;
