import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FC, ReactNode } from 'react';

// ! alert  =>
export const handleShowAlert = (
  title: string,
  success: boolean,
  status: string,
  toast: any
) => {
  setTimeout(() => {
    toast({
      title,
      status,
      duration: 2000,
      className: `${
        success ? 'bg-green-600' : 'bg-red-600 '
      } shadow-black/50 border-2 border-black text-right text-wrap text-white shadow-md
       `,
      dir: 'rtl',
    });
  }, 1000);
};

// ! confirm alert =>
interface ConfirmProps {
  title: string;
  description?: string | null;
  onClick: () => void;
  isClose?: boolean;
  children: ReactNode;
}
export const ConfirmAlert: FC<ConfirmProps> = ({
  title,
  description = null,
  onClick,
  children,
  isClose = true,
}) => {
  return (
    <AlertDialog >
      <AlertDialogTrigger className='w-full'>{children}</AlertDialogTrigger>
      <AlertDialogContent dir='rtl' className='bg-white overflow-hidden'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-right mb-2 text-red-800'>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-right'>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex gap-3'>
          {isClose && <AlertDialogCancel className='min-w-24'>خیر</AlertDialogCancel>}
          <AlertDialogAction
            className='min-w-24 bg-red-700 hover:bg-red-800'
            onClick={onClick}
          >
            تایید
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
