import { FastField, FieldProps } from 'formik';
import React, { FC, useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import ErrorAlert from './errorAlert';

export interface fileProps {
  name: string;
  control: string;
  label: string;
  className?: string;
  padding?: boolean;
  formik: any;
}
const FormikFile: FC<fileProps> = ({
  name,
  className,
  label,
  padding = false,
  formik,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  //  handle change file =>
  const handleChange = (e: any, form: any) => {
    e.stopPropagation();
    if (form.field.value) {
      form.form.setFieldValue(name, null);
    } else {
      ref.current?.click();
    }
  };

  // ! handle set file =>
  const handleSetFile = (e: any, form: any) => {
    form.form.setFieldValue(name, e.target.files[0]);
  };

  return (
    <FastField name={name}>
      {(form: FieldProps<any>) => {
        return (
          <div
            className={`flex flex-col w-11/12 mx-auto max-w-sm justify-center gap-1 ${className}`}
          >
            <Label htmlFor={name} className='text-[15px] font-bold text-red-700'>
              {label} :
            </Label>
            <div className='w-full bg-red-500 relative'>
              <Input
                ref={ref}
                id={name}
                type='file'
                className='h-10 w-full  absolute z-10 
                font-bold text-[14px] placeholder:text-[14px]'
                {...form.field}
                value={undefined}
                onChange={(e: any) => handleSetFile(e, form)}
              />
              <span
                onClick={(e) => handleChange(e, form)}
                className='h-10 w-full border-2 rounded-md absolute z-20 border-black/80 
               bg-white flex justify-center cursor-pointer items-center text-[14px] '
              >
                {form.field.value ? (
                  <div className='cursor-pointer items-center w-full h-full justify-around flex'>
                    <span>{form.field.value.name.slice(0,10)}</span>
                    <hr className='w-[2px] bg-black h-full ' />
                    <span className='text-red-700 text-center'>
                      برای حذف عکس اینجا کلیک کنید !
                    </span>
                  </div>
                ) : (
                  <> برای انتخاب عکس روی اینجا کلیک کنید !</>
                )}
              </span>
            </div>
            <div
              className={`${
                padding && 'md:relative md:-mt-2 md:mb-10'
              } gap-4 flex flex-col`}
            >
              {formik.errors[name]}
              <ErrorAlert name={name} padding={padding} />
            </div>
          </div>
        );
      }}
    </FastField>
  );
};

export default FormikFile;
