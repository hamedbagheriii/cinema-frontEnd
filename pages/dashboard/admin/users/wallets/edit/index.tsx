import AddHeaderCompo from '@/components/addHeaderCompo';
import { handleShowAlert } from '@/components/AlertCompo';
import FormikControl from '@/components/formik/formikControl';
import SubmitCompo from '@/components/submitCompo';
import { useToast } from '@/hooks/use-toast';
import { addUserService, editUserService } from '@/services/dashboard/users/users';
import { editWalletService } from '@/services/dashboard/wallets/wallets';
import LoadingData from '@/utils/loadingData';
import { numberWithCommas } from '@/utils/numWCommas';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// ! formik dependencies
const initalvalues = {
  email: '',
  nextAmount: 10000,
};

const onSubmit = async (values: any, actions: any, toast: any, router: any) => {
  try {
    const data = {
      email: values.email,
      Amount: values.nextAmount,
    };
    let res = await editWalletService(data);

    if (res.status === 200) {
      handleShowAlert(
        `کیف پول کاربر با ایمیل ${values.email} با موفقیت ویرایش شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        router.back();
      }, 2000);
    } else {
      handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
    }
  } catch (error: any) {
    handleShowAlert(error.response.data.message || error.message, false, 'error', toast);
  } finally {
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  }
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('لطفا فرمت ایمیل ( reza@gmail.com ) را رعایت کنید .')
    .required('این فیلد الزامی میباشد .'),
  nextAmount: Yup.number()
    .min(1000, 'حداقل 1000 تومان وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
});
// ! formik dependencies

const UserPath = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [reinitalvalues, setReinitialvalues] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data } = router.query;

  //  ! handle edit data =>
  const handleEditData = async () => {
    const dataObj = await JSON.parse(router.query.data as string);

    setReinitialvalues({
      ...dataObj,
      nextAmount: 0,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      handleEditData();
    }
  }, [data]);

  return isLoading ? (
    <div className='flex justify-center mt-5 items-center px-4'>
      <LoadingData />
    </div>
  ) : (
    <AddHeaderCompo title={'ویرایش کیف پول'} icon={'wallet2'}>
      <Formik
        initialValues={reinitalvalues || initalvalues}
        onSubmit={(values, actions) => {
          onSubmit(values, actions, toast, router);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {(formik: any) => {
          return (
            <Form className='w-full flex flex-col items-center justify-evenly '>
              <div className='w-full flex flex-col gap-1 mb-2 justify-center items-center  '>
                <span>مقدار فعلی :</span>
                <b className='text-[20px] text-red-700'>
                  {numberWithCommas(reinitalvalues.Amount)}{' '}
                  <span className='text-black'>تومان</span>
                </b>
              </div>

              <div className='mb-4 w-full'>
                <FormikControl
                  name='nextAmount'
                  type='number'
                  placeholder='مثال : 10000'
                  label='مقدار کیف پول'
                  control='input'
                />
              </div>

              <div className='mb-6 w-full'>
                <FormikControl
                  name='email'
                  type='text'
                  placeholder='مثال : reza@gmail.com'
                  label='ایمیل'
                  control='input'
                  disabled={reinitalvalues}
                />
              </div>

              <SubmitCompo
                router={router}
                reinitalvalues={reinitalvalues}
                formik={formik}
              />
            </Form>
          );
        }}
      </Formik>
    </AddHeaderCompo>
  );
};

export default UserPath;
