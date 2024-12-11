import { FastField, FieldProps } from 'formik';
import ErrorAlert from './errorAlert';
import React, { FC, useEffect, useState } from 'react';
import { Label } from '../ui/label';
import LoadingData from '@/utils/loadingData';

export interface selectProps {
  name: string;
  control: string;
  label: string;
  className?: string;
  padding?: boolean;
  data?: any;
  formik?: any;
  targetName: string;
  reinitalvalues: any;
}
const SelectChips: FC<selectProps> = ({
  name,
  className,
  label,
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

    if (id !== 0) {
      if (e && !selectedItem.includes(id)) {
        newItems.push(id);

        setSelectedItem(newItems);
        formik.setFieldValue(targetName, newItems);
        formik.setFieldValue(name, []);
      } else if (!e && selectedItem.includes(id)) {
        newItems.splice(newItems.indexOf(id), 1);

        setSelectedItem(newItems);
        formik.setFieldValue(targetName, newItems);
        formik.setFieldValue(name, []);
      }
    }
  };

  useEffect(() => {
    if (reinitalvalues !== null) {
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    if (reinitalvalues) {
      setSelectedItem(reinitalvalues.roles);
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
              className={`flex flex-col w-11/12 mx-auto 
            max-w-sm justify-center gap-1 ${className}`}
            >
              <Label
                htmlFor={name}
                className='text-[15px] text-right w-11/12  mb-2 font-bold text-red-700'
              >
                {label} :
              </Label>

              <select
                className='border-2 border-black/80  py-1  rounded-md bg-white'
                onChange={(e: any) => {
                  handleItems(true, Number(e.target.value));
                }}
              >
                {data.map((t: any) => {
                  return (
                    <option className='w-full' key={t.id} value={t.id}>
                      {t.roleName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* selected item => */}
            <div
              className='w-11/12 mx-auto max-w-sm h-fit py-1   flex flex-row justify-start
             items-center gap-2 flex-wrap'
            >
              {selectedItem.length > 0 &&
                selectedItem.map((t: any) => {
                  const itemData = data.filter((s : any)=> s.id == t)[0];
                  return (
                    <div
                      key={`${t}_${targetName}`}
                      onClick={() => handleItems(false, t)}
                      className='flex flex-row gap-2 items-center px-5 pb-1 pt-2 text-center
                    rounded-full bg-red-700 cursor-pointer hover:bg-red-800 w-fit'
                    >
                      <span className='text-white text-center'>{itemData.roleName}</span>
                    </div>
                  );
                })}
            </div>

            {/* error => */}
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

export default SelectChips;
