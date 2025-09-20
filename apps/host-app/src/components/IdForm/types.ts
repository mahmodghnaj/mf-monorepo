export type IdInfo = {
  idNumber: string;
  nationality: string;
};

export type IdFormProps = {
  value: IdInfo;
  onChange: (next: IdInfo, valid: boolean) => void;
};
