import type { PassportData } from 'passport_form/PassportForm';
import type { IdInfo } from '../IdForm';

export type StepConfig = {
  id: string;
  label: string;
  render: (props: any) => React.ReactNode;
  isValid: (state: WizardState) => boolean;
};

export type WizardState = {
  passport: { valid: boolean; data: PassportData | null };
  idInfo: IdInfo;
  idValid: boolean;
};
