import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import type { PassportFormProps, PassportData } from "./types";
import { fileToBase64 } from "../../utils/file";

type FormValues = {
  passportNumber: string;
  firstName: string;
  lastName: string;
  issueDate: string;
  expiryDate: string;
  document: FileList;
};

const PassportForm: React.FC<PassportFormProps> = ({
  onUpdate,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      passportNumber: initialData?.passportNumber ?? "",
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      issueDate: initialData?.issueDate ?? "",
      expiryDate: initialData?.expiryDate ?? "",
    },
  });

  const values = watch();

  // Validation logic + emit state to host
  useEffect(() => {
    const validateAndEmit = async () => {
      try {
        if (
          !values.passportNumber ||
          !values.firstName ||
          !values.lastName ||
          !values.issueDate ||
          !values.expiryDate ||
          !values.document?.[0]
        ) {
          onUpdate?.({ valid: false, data: null });
          return;
        }

        const issueDate = new Date(values.issueDate);
        const expiryDate = new Date(values.expiryDate);

        if (expiryDate <= issueDate) {
          setError("expiryDate", {
            type: "manual",
            message: "Expiry date must be after Issue date",
          });
          onUpdate?.({ valid: false, data: null });
          return;
        }

        const file = values.document[0];
        const allowedTypes = [
          "application/pdf",
          "image/png",
          "image/jpeg",
          "image/jpg",
        ];
        if (!allowedTypes.includes(file.type)) {
          setError("document", {
            type: "manual",
            message: "Only PDF, PNG, JPEG, JPG allowed",
          });
          onUpdate?.({ valid: false, data: null });
          return;
        }

        const base64 = await fileToBase64(file);

        const payload: PassportData = {
          passportNumber: values.passportNumber,
          firstName: values.firstName,
          lastName: values.lastName,
          issueDate: values.issueDate,
          expiryDate: values.expiryDate,
          document: {
            fileName: file.name,
            mimeType: file.type,
            base64,
          },
        };

        onUpdate?.({ valid: true, data: payload });
      } catch {
        onUpdate?.({ valid: false, data: null });
      }
    };

    validateAndEmit();
  }, [values, setError, onUpdate]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
      aria-label="Passport Form"
    >
      <div className={styles.inputGroup}>
        <label htmlFor="passportNumber" className={styles.label}>
          Passport Number
        </label>
        <input
          id="passportNumber"
          className={styles.input}
          {...register("passportNumber", { required: "Required" })}
        />
        {errors.passportNumber && (
          <span className={styles.error} role="alert">
            {errors.passportNumber.message}
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="firstName" className={styles.label}>
          First Name
        </label>
        <input
          id="firstName"
          className={styles.input}
          {...register("firstName", { required: "Required" })}
        />
        {errors.firstName && (
          <span className={styles.error} role="alert">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="lastName" className={styles.label}>
          Last Name
        </label>
        <input
          id="lastName"
          className={styles.input}
          {...register("lastName", { required: "Required" })}
        />
        {errors.lastName && (
          <span className={styles.error} role="alert">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="issueDate" className={styles.label}>
          Issue Date
        </label>
        <input
          id="issueDate"
          type="date"
          className={styles.input}
          {...register("issueDate", { required: "Required" })}
        />
        {errors.issueDate && (
          <span className={styles.error} role="alert">
            {errors.issueDate.message}
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="expiryDate" className={styles.label}>
          Expiry Date
        </label>
        <input
          id="expiryDate"
          type="date"
          className={styles.input}
          {...register("expiryDate", { required: "Required" })}
        />
        {errors.expiryDate && (
          <span className={styles.error} role="alert">
            {errors.expiryDate.message}
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="document" className={styles.label}>
          Passport Document
        </label>
        <input
          id="document"
          type="file"
          accept=".pdf,.png,.jpeg,.jpg"
          className={styles.fileInput}
          {...register("document", { required: "Required" })}
        />
        {errors.document && (
          <span className={styles.error} role="alert">
            {errors.document.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default PassportForm;
