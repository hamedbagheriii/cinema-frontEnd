import React, { FC } from 'react';
import FormikControl from './formik/formikControl';

interface submitProps {
  router: any;
  reinitalvalues?: boolean;
  formik: any;
  className?: string;
  cancel?: () => void;
  isCancel ?: boolean
}
const SubmitCompo: FC<submitProps> = ({
  router,
  reinitalvalues = false,
  formik,
  className,
  cancel,
  isCancel = false,
}) => {
  return (
    <div
      className={`flex sm:max-w-[400px] flex-col gap-y-2 sm:flex-row justify-around w-full ${className}`}
    >
      <FormikControl
        title={isCancel ? 'لغو' : 'بازگشت'}
        control='submitBTN'
        onClick={isCancel ? cancel : () => router.back()}
        className='bg-gray-800 w-full sm:w-fit hover:bg-gray-700'
        formik={formik}
        type='button'
      />

      <FormikControl
        title={reinitalvalues ? 'ویرایش' : 'افزودن'}
        className='w-full sm:w-fit'
        control='submitBTN'
        formik={formik}
      />
    </div>
  );
};

export default SubmitCompo;
