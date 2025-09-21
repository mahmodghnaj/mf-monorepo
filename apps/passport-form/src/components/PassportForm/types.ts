import type { PassportData } from '../../types/passport';

export type PassportFormProps = {
  onUpdate?: (payload: { valid: boolean; data: PassportData | null }) => void;
  initialData?: Partial<PassportData>;
};
