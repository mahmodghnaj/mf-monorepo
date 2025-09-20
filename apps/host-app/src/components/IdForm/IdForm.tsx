import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { IdFormProps, IdInfo } from "./types";

const nationalities = [
  { code: "AE", label: "United Arab Emirates" },
  { code: "EG", label: "Egypt" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "JO", label: "Jordan" },
  { code: "LB", label: "Lebanon" },
];

const IdForm: React.FC<IdFormProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState<IdInfo>(value);

  useEffect(() => {
    const isValid =
      localValue.idNumber.trim() !== "" && localValue.nationality.trim() !== "";
    onChange(localValue, isValid);
  }, [localValue, onChange]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
      aria-label="ID Form"
    >
      <div className={styles.inputGroup}>
        <label htmlFor="idNumber" className={styles.label}>
          ID Number
        </label>
        <input
          id="idNumber"
          className={styles.input}
          value={localValue.idNumber}
          onChange={(e) =>
            setLocalValue({ ...localValue, idNumber: e.target.value })
          }
        />
        {localValue.idNumber === "" && (
          <span className={styles.error} role="alert">
            Required
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="nationality" className={styles.label}>
          Nationality
        </label>
        <select
          id="nationality"
          className={styles.select}
          value={localValue.nationality}
          onChange={(e) =>
            setLocalValue({ ...localValue, nationality: e.target.value })
          }
        >
          <option value="">Select nationality</option>
          {nationalities.map((n) => (
            <option key={n.code} value={n.code}>
              {n.label}
            </option>
          ))}
        </select>
        {localValue.nationality === "" && (
          <span className={styles.error} role="alert">
            Required
          </span>
        )}
      </div>
    </form>
  );
};

export default IdForm;
