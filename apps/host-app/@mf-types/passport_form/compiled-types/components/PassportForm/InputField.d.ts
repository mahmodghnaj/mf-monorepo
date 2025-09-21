import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
type InputFieldProps = {
    id: string;
    label: string;
    name: string;
    register: UseFormRegister<any>;
    placeholder?: string;
    type?: string;
    error?: string;
};
declare const InputField: React.FC<InputFieldProps>;
export default InputField;
