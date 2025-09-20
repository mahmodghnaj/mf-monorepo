import { PassportData } from "passport_form/PassportForm";
import type { IdInfo } from "../IdForm";

export type WizardState = {
  step: 1 | 2;
  passport: { valid: boolean; data: PassportData | null };
  idInfo: IdInfo;
  idValid: boolean;
};
