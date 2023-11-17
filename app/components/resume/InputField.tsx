import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
};

const InputField: React.FC<InputFieldProps> = ({ name, register, placeholder }) => {
  return <input {...register(name)} placeholder={placeholder}/>;
};

export default InputField;
