import React, { FC } from 'react';
import { Alert, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { ErrorMessage, FieldProps } from 'formik';

interface ErrorAlertProps { 
    name : string;
}
const ErrorAlert : FC<ErrorAlertProps> = ({name}) => {
  return (
    <ErrorMessage name={name}>
      {(message : any) => {
        console.log(message);
        
        return (
          <Alert className='flex align-middle items-center py-0 px-0 pl-5 min-w-[170px] 
          border-2 w-fit' variant='destructive'>
            <span className='flex items-center justify-center mx-2'>
              <AlertCircle className='size-3.5 font-bold' />
            </span>
            <AlertTitle className='align-bottom mt-1.5 text-[13px]'>{message}</AlertTitle>
          </Alert>
        );
      }}
    </ErrorMessage>
  );
};

export default ErrorAlert;