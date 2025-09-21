import styles from './index.module.css';

const WizardActions = ({
  stepIndex,
  canNext,
  onBack,
  onNext,
  isLast,
}: {
  stepIndex: number;
  canNext: boolean;
  onBack: () => void;
  onNext: () => void;
  isLast: boolean;
}) => (
  <div className={styles.actions}>
    {stepIndex > 0 && (
      <button className="secondary" onClick={onBack}>
        Back
      </button>
    )}
    <button className="primary" disabled={!canNext} onClick={onNext}>
      {isLast ? 'Submit' : 'Next'}
    </button>
  </div>
);
export default WizardActions;
