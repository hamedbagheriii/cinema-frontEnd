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
}
const SubmitBtn: FC<SubmitBtnProps> = ({
  title,
  className,
  formik,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      type='submit'
      className={`w-4/12 text-[17px]  bg-red-700 hover:bg-red-800 mx-auto  ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {formik.isSubmitting ? (
        <Loader2 className='animate-spin' style={{ width: '20px', height: '20px' }} />
      ) : (
        title
      )}
    </Button>
  );
};

export default SubmitBtn;
