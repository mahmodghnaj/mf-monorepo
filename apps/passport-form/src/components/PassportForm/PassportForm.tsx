import React, { useId, useEffect, useRef } from 'react';
import { useForm, Controller, useFormState, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './index.module.css';
import type { PassportData } from '../../types/passport';
import type { PassportFormProps } from './types';
import { fileToBase64, fileSchema } from '../../utils/file';
import InputField from './InputField';

const schema = z
  .object({
    passportNumber: z.string().min(1, 'Passport number is required'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    issueDate: z.string().min(1, 'Issue date is required'),
    expiryDate: z.string().min(1, 'Expiry date is required'),
    document: fileSchema,
  })
  .refine((data) => new Date(data.expiryDate) > new Date(data.issueDate), {
    message: 'Expiry date must be after Issue date',
    path: ['expiryDate'],
  });

type FormValues = z.infer<typeof schema>;

const PassportForm: React.FC<PassportFormProps> = ({ onUpdate, initialData }) => {
  const id = useId();
  const lastPayload = useRef<{ valid: boolean; data: PassportData | null } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, control, handleSubmit, getValues } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      passportNumber: initialData?.passportNumber ?? '',
      firstName: initialData?.firstName ?? '',
      lastName: initialData?.lastName ?? '',
      issueDate: initialData?.issueDate ?? '',
      expiryDate: initialData?.expiryDate ?? '',
      document: initialData?.document?.file,
    },
  });

  const { errors, isValid } = useFormState({ control });
  const watchedValues = useWatch({ control });

  const buildPayload = async () => {
    const { passportNumber, firstName, lastName, issueDate, expiryDate, document } = getValues();
    if (!document?.[0]) return null;
    const file = document[0];
    return {
      passportNumber,
      firstName,
      lastName,
      issueDate,
      expiryDate,
      document: {
        fileName: file.name,
        mimeType: file.type,
        base64: await fileToBase64(file),
        file: document,
      },
    };
  };

  useEffect(() => {
    const update = async () => {
      const payload = isValid ? await buildPayload() : null;
      const newPayload = { valid: isValid, data: payload };

      if (JSON.stringify(lastPayload.current) !== JSON.stringify(newPayload)) {
        lastPayload.current = newPayload;
        onUpdate?.(newPayload);
      }
    };
    update();
  }, [watchedValues, isValid]);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} aria-label="Passport Form">
      <InputField
        id={`${id}-passportNumber`}
        label="Passport Number*"
        placeholder="e.g. A1234567"
        error={errors.passportNumber?.message}
        register={register}
        name="passportNumber"
      />

      <div className={styles.rowGroup}>
        <InputField
          id={`${id}-firstName`}
          label="First Name*"
          placeholder="First name"
          error={errors.firstName?.message}
          register={register}
          name="firstName"
        />
        <InputField
          id={`${id}-lastName`}
          label="Last Name*"
          placeholder="Last name"
          error={errors.lastName?.message}
          register={register}
          name="lastName"
        />
      </div>

      <div className={styles.rowGroup}>
        <InputField
          id={`${id}-issueDate`}
          label="Issue Date*"
          type="date"
          error={errors.issueDate?.message}
          register={register}
          name="issueDate"
        />
        <InputField
          id={`${id}-expiryDate`}
          label="Expiry Date*"
          type="date"
          error={errors.expiryDate?.message}
          register={register}
          name="expiryDate"
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.fileRow}>
          <label className={styles.fileLabel}>Passport Document*</label>
          <button
            type="button"
            className={styles.browseButton}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload
          </button>
        </div>

        <Controller
          control={control}
          name="document"
          render={({ field }) => {
            const file = field.value?.[0];
            return (
              <>
                <input
                  ref={fileInputRef}
                  id={`${id}-document`}
                  type="file"
                  accept=".pdf,.png,.jpeg,.jpg"
                  className={styles.fileInput}
                  onChange={(e) => field.onChange(e.target.files)}
                />

                {file && (
                  <div className={styles.fileInfo}>
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}

                {!file && initialData?.document && (
                  <div className={styles.fileInfo}>{initialData.document.fileName}</div>
                )}

                {errors.document && <div className={styles.error}>{errors.document.message}</div>}
              </>
            );
          }}
        />
      </div>
    </form>
  );
};

export default PassportForm;
