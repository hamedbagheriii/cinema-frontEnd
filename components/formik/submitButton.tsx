import React, { FC } from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

export interface SubmitBtnProps {
  title: string;
  control: string;
  className?: string;
  formik: any;
  disabled?: boolean;
  onClick?: () => void;
  type ?: any;
}
const SubmitBtn: FC<SubmitBtnProps> = ({
  title,
  className,
  formik,
  disabled = false,
  onClick,
  type = 'submit',
}) => {
  return (
    <Button
      type={type }
      className={`w-4/12 text-[17px] min-w-[160px] max-w-[250px]  bg-red-700 hover:bg-red-800 mx-auto  ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {formik.isSubmitting && type !== 'button' ? (
        <Loader2 className='animate-spin' style={{ width: '20px', height: '20px' }} />
      ) : (
        title
      )}
    </Button>
  );
};

export default SubmitBtn;
