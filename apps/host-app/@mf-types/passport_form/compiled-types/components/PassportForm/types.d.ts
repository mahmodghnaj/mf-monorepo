export type PassportDocumentPayload = {
    fileName: string;
    mimeType: string;
    base64: string;
    file?: FileList;
};
export type PassportData = {
    passportNumber: string;
    firstName: string;
    lastName: string;
    issueDate: string;
    expiryDate: string;
    document: PassportDocumentPayload;
};
export type PassportFormProps = {
    onUpdate?: (payload: {
        valid: boolean;
        data: PassportData | null;
    }) => void;
    initialData?: Partial<PassportData>;
};
