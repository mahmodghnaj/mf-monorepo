import React, { useEffect, useId } from 'react';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './index.module.css';
import type { IdFormProps } from './types';

const nationalities = [
  { code: 'AE', label: 'United Arab Emirates' },
  { code: 'EG', label: 'Egypt' },
  { code: 'SA', label: 'Saudi Arabia' },
  { code: 'JO', label: 'Jordan' },
  { code: 'LB', label: 'Lebanon' },
];

const schema = z.object({
  idNumber: z.string().min(1, 'ID Number is required'),
  nationality: z.string().min(1, 'Nationality is required'),
});

type FormValues = z.infer<typeof schema>;

const IdForm: React.FC<IdFormProps> = ({ value, onChange }) => {
  const id = useId();

  const { register, handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      idNumber: value.idNumber ?? '',
      nationality: value.nationality ?? '',
    },
  });

  const { errors, isValid } = useFormState({ control });

  const watchedValues = useWatch({ control });

  useEffect(() => {
    onChange(watchedValues, isValid);
  }, [watchedValues, isValid]);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} aria-label="ID Form">
      <div className={styles.inputGroup}>
        <label htmlFor={id} className={styles.label}>
          ID Number
        </label>
        <input className={styles.input} placeholder="Enter ID number" {...register('idNumber')} />
        {errors && <div className={styles.error}>{errors.idNumber?.message}</div>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor={`${id}-nationality`} className={styles.label}>
          Nationality
        </label>
        <select id={`${id}-nationality`} className={styles.select} {...register('nationality')}>
          <option value="">Select nationality</option>
          {nationalities.map((n) => (
            <option key={n.code} value={n.code}>
              {n.label}
            </option>
          ))}
        </select>
        {errors.nationality && (
          <span className={styles.error} role="alert">
            {errors.nationality.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default IdForm;
