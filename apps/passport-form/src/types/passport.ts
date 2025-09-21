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
