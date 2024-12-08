import React, { FC } from 'react';
import FormikControl from './formik/formikControl';

interface submitProps {
  router: any;
  reinitalvalues?: boolean;
  formik: any;
  className ?: string;
}
const SubmitCompo: FC<submitProps> = ({
  router,
  reinitalvalues = false,
  formik,
  className,
}) => {
  return (
    <div
      className={`flex sm:max-w-[400px] flex-col gap-y-2 sm:flex-row justify-around w-full ${className}`}
    >
      <FormikControl
        title='بازگشت'
        control='submitBTN'
        onClick={() => router.back()}
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
