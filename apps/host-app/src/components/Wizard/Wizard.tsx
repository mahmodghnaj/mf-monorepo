import React, { useState, Suspense } from "react";
import PassportForm, { PassportData } from "passport_form/PassportForm";
import IdForm, { IdInfo } from "../IdForm";
import { WizardState } from "./types";
import styles from "./index.module.css";

const Wizard: React.FC = () => {
  const [state, setState] = useState<WizardState>({
    step: 1,
    passport: { valid: false, data: null },
    idInfo: { idNumber: "", nationality: "" },
    idValid: false,
  });

  const handlePassportUpdate = (payload: {
    valid: boolean;
    data: PassportData | null;
  }) => {
    setState((prev) => ({ ...prev, passport: payload }));
  };

  const handleIdUpdate = (idInfo: IdInfo, valid: boolean) => {
    setState((prev) => ({ ...prev, idInfo, idValid: valid }));
  };

  const handleSubmit = () => {
    if (!state.passport.valid || !state.idValid || !state.passport.data) return;
    const payload = {
      passport: state.passport.data,
      idInfo: state.idInfo,
    };
    console.log("✅ Final Payload:", payload);
    alert(JSON.stringify(payload, null, 2));
  };

  return (
    <div className={styles.wizard}>
      {state.step === 1 && (
        <Suspense fallback={<div>Loading Passport Form...</div>}>
          <PassportForm
            onUpdate={handlePassportUpdate}
            initialData={state.passport.data ?? undefined}
          />
          <div className={styles.actions}>
            <button className="secondary" disabled>
              Back
            </button>
            <button
              className="primary"
              disabled={!state.passport.valid}
              onClick={() => setState((p) => ({ ...p, step: 2 }))}
            >
              Next
            </button>
          </div>
        </Suspense>
      )}

      {state.step === 2 && (
        <>
          <IdForm value={state.idInfo} onChange={handleIdUpdate} />
          <div className={styles.actions}>
            <button
              className="secondary"
              onClick={() => setState((p) => ({ ...p, step: 1 }))}
            >
              Back
            </button>
            <button
              className="primary"
              disabled={!state.passport.valid || !state.idValid}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Wizard;
