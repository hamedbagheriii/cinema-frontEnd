import { FastField, FieldProps } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { Label } from '../ui/label';
import ErrorAlert from './errorAlert';
import { Checkbox } from '../ui/checkbox';
import LoadingData from '@/utils/loadingData';

export interface checkProps {
  name: string;
  control: string;
  label: string;
  className?: string;
  disabled?: boolean;
  padding?: boolean;
  data?: any;
  formik?: any;
  targetName: string;
  reinitalvalues: any;
}
const FormikCheck: FC<checkProps> = ({
  name,
  className,
  label,
  disabled = false,
  padding = false,
  formik,
  data,
  targetName,
  reinitalvalues = null,
}) => {
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ! handle add or remove item =>
  const handleItems = (e: any, id: number) => {
    const newItems = selectedItem;

    if (e) {
      newItems.push(id);

      setSelectedItem(newItems);
      formik.setFieldValue(targetName, newItems);
      formik.setFieldValue(name, []);
    } else {
      newItems.splice(newItems.indexOf(id), 1);

      setSelectedItem(newItems);
      formik.setFieldValue(targetName, newItems);
      formik.setFieldValue(name, []);
    }
  };

  useEffect(() => {
    if (reinitalvalues !== null) {
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    if (reinitalvalues) {
      setSelectedItem(reinitalvalues.permissions);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [reinitalvalues]);

  return isLoading ? (
    <div className='w-full px-2 py-2'>
      <LoadingData />
    </div>
  ) : (
    <FastField name={name}>
      {(form: FieldProps<any>) => {
        return (
          <>
            <div
              className='w-full px-4 flex flex-col flex-wrap
              h-full sm:flex-row justify-center items-center sm:justify-around'
            >
              <Label
                htmlFor={name}
                className='text-[15px] text-right w-11/12  mb-2 font-bold text-red-700'
              >
                {label} :
              </Label>

              {data &&
                data.map((t: any) => (
                  <div
                    key={`${t.id}_${t.permName}`}
                    className={`flex border-2 my-2 border-black p-2 rounded-md flex-row w-full sm:w-5/12   justify-start gap-1 ${className}`}
                  >
                    <Checkbox
                      id={`${t.id}_${name}`}
                      className=' border-2 size-5 border-black/80  bg-white font-bold text-[14px] placeholder:text-[14px]'
                      {...form.field}
                      onCheckedChange={(e) => handleItems(e, t.id)}
                      disabled={disabled}
                      checked={formik.values.permissions.includes(t.id)}
                    />
                    <Label
                      htmlFor={name}
                      className='text-[15px] ms-1 font-bold text-red-700'
                    >
                      {t.permName}
                    </Label>
                  </div>
                ))}
            </div>
            <div
              className={`${
                padding && 'md:relative md:-mt-2 md:mb-10'
              } px-4 w-full flex flex-row justify-center items-center -mt-2`}
            >
              {targetName && <ErrorAlert name={targetName} padding={padding} />}
            </div>
          </>
        );
      }}
    </FastField>
  );
};

export default FormikCheck;
