import { FastField, FieldProps } from 'formik';
import React, { FC } from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import ErrorAlert from './errorAlert';

export interface TeaxtAreaProps {
  name: string;
  control: string;
  placeholder: string;
  label: string;
  className?: string;
  padding?: boolean;
}
const TeaxtArea: FC<TeaxtAreaProps> = ({
  name,
  placeholder,
  className,
  label,
  padding = false,
}) => {
  return (
    <FastField name={name} placeholder={placeholder}>
      {(form: FieldProps<any>) => {
        return (
          <div
            className={`flex flex-col w-11/12 mx-auto max-w-sm justify-center gap-1 ${className}`}
          >
            <Label htmlFor={name} className='text-[15px] font-bold text-red-700'>
              {label} :
            </Label>
            <Textarea
              maxLength={150}
              {...form.field}
              id={name}
              placeholder={placeholder}
              className='h-10 border-2 border-black/80 max-h-[100px]  bg-white font-bold text-[14px] placeholder:text-[14px]'
            />
            <div className={`${padding && 'md:relative md:-mt-2 md:mb-10'}`}>
              <ErrorAlert name={name} padding={padding} />
            </div>
          </div>
        );
      }}
    </FastField>
  );
};
export default TeaxtArea;
