import { useState, type FC } from 'react';
import PassportForm from 'passport_form/PassportForm';
import type { PassportData } from 'passport_form/PassportForm';

import IdForm from '../IdForm';
import type { IdInfo } from '../IdForm';
import styles from './index.module.css';
import type { StepConfig, WizardState } from './types';
import WizardActions from './WizardActions';

const steps: StepConfig[] = [
  {
    id: 'passport',
    label: 'Passport Info',
    render: ({ state, onPassportUpdate }: any) => (
      <PassportForm onUpdate={onPassportUpdate} initialData={state.passport.data ?? undefined} />
    ),
    isValid: (state) => state.passport.valid,
  },
  {
    id: 'idInfo',
    label: 'ID Info',
    render: ({ state, onIdUpdate }: any) => <IdForm value={state.idInfo} onChange={onIdUpdate} />,
    isValid: (state) => state.idValid && state.passport.valid,
  },
];

const Wizard: FC<{ onFinish?: (data: any) => void }> = ({ onFinish }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<WizardState>({
    passport: { valid: false, data: null },
    idInfo: { idNumber: '', nationality: '' },
    idValid: false,
  });

  const currentStep = steps[stepIndex];

  const isLast = stepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      if (!state.passport.data) return;

      const { file, ...documentWithoutFile } = state.passport.data.document;

      const cleanedPassport = {
        ...state.passport.data,
        document: documentWithoutFile,
      };

      const payload = {
        passport: cleanedPassport,
        idInfo: state.idInfo,
      };

      console.log('Final Payload:', payload);
      onFinish?.(payload);
      alert(JSON.stringify(payload));
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  return (
    <div className={styles.wizard}>
      <div className={styles.progress}>
        {steps.map((s, i) => (
          <div key={s.id} className={`${styles.step} ${i <= stepIndex ? styles.active : ''}`}>
            {s.label}
          </div>
        ))}
      </div>

      {currentStep.render({
        state,
        onPassportUpdate: (payload: { valid: boolean; data: PassportData | null }) =>
          setState((prev) => ({ ...prev, passport: payload })),
        onIdUpdate: (idInfo: IdInfo, valid: boolean) =>
          setState((prev) => ({ ...prev, idInfo, idValid: valid })),
      })}

      <WizardActions
        stepIndex={stepIndex}
        canNext={currentStep.isValid(state)}
        onBack={() => setStepIndex((i) => i - 1)}
        onNext={handleNext}
        isLast={isLast}
      />
    </div>
  );
};

export default Wizard;
