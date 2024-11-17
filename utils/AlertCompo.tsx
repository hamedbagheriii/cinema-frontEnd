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
      } shadow-black/50 border-2 border-black text-white shadow-md
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
  children : ReactNode;
}
export const ConfirmAlert: FC<ConfirmProps> = ({
  title,
  description = null,
  onClick,
  children
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent dir='rtl' className='bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-right mb-2 text-red-800'>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogContent>
              <AlertDialogDescription className='text-right'>
                {description}
              </AlertDialogDescription>
            </AlertDialogContent>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className='flex gap-3'>
          <AlertDialogCancel className='min-w-24'>خیر</AlertDialogCancel>
          <AlertDialogAction className='min-w-24 bg-red-700 hover:bg-red-800' onClick={onClick}>
            تایید
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
