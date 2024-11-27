import FormikControl from '@/components/formik/formikControl';
import Layout from '@/components/layout/dashboard/layout';
import { useToast } from '@/hooks/use-toast';
import { useToken } from '@/hooks/use-Token';
import { incWalletService } from '@/services/wallet/wallet';
import { handleShowAlert } from '@/utils/AlertCompo';
import { numberWithCommas } from '@/utils/numbWithCommas';
import { Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';


// ! formik dependency =>
const initalValues = {
  amount: 10000,
};

const onSubmit = async (values: any, action: any, toast: any, router: any) => {
  //  request =>
  try {
    const res: any = await incWalletService(values);

    if (res.status === 200) {
      handleShowAlert(res.data.message, true, 'success', toast);
      setTimeout(() => {
        router.push('/dashboard/profile');
      }, 1500);
    } else {
      handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
    }
  } catch (error: any) {
    handleShowAlert(error.response.data.message || error.message, false, 'error', toast);
  } finally {
    setTimeout(() => {
      action.setSubmitting(false);
    }, 1000);
  }
};

const validationSchema = Yup.object({
  amount: Yup.number()
    .required('لطفا مقداری وارد کنید .')
    .min(10000, 'حداقل 10,000 تومان وارد کنید .')
    .typeError('لطفا فقط عدد وارد کنید .'),
});
// ! formik dependency <=


const Index = () => {
  const { isUser } = useToken();
  const { toast } = useToast();
  const router = useRouter();

  // box actions and styles =>
  const amountBox = [
    { value: 50000, id: 1 },
    { value: 100000, id: 2 },
    { value: 200000, id: 3 },
  ];
  const boxStyle = 'px-4 py-2 cursor-pointer rounded-full  ring-2 ring-black';
  const handleSetValue = (value: number, formik: FormikProps<any>) => {
    formik.setValues({ amount: value });
  };

  return (
    <Layout>
      <div className='border shadow-lg rounded-2xl '>
        {/* wallet page header => */}
        <div className='w-full flex flex-col gap-4 pt-4'>
          <div className='flex  items-center w-full px-5 gap-3 justify-start lg:justify-center'>
            <i className='bi bi-wallet2 text-red-800 -mt-1' style={{ fontSize: 40 }}></i>
            <span className='text-center text-[20px] -mt-3 text-red-800 font-bold'>
              کیف پول
            </span>
          </div>
          <hr className='bg-black/20 h-1 mb-2 mx-auto -mt-3 w-11/12 max-w-[700px] rounded-full' />

          <div className='w-full flex flex-col items-center font-normal justify-center gap-8 '>
            <span className='text-sm text-right lg:text-center px-6 w-full'>
              برای افزایش موجودی کیف پول، مبلغ مورد نظر خود را انتخاب کنید .
            </span>

            <span>اعتبار فعلی شما :</span>
            <span className='-mt-5 text-xl font-bold'>
              {numberWithCommas(isUser?.wallet[0].Amount) || '0'} تومان
            </span>
          </div>
        </div>

        <Formik
          initialValues={initalValues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions, toast, router);
          }}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form className='flex flex-col pb-6 pt-4 gap-4 w-full justify-center items-center'>
                <FormikControl
                  control='input'
                  label='مقدار'
                  placeholder='حداقل 10,000 تومان'
                  name='amount'
                  type='number'
                  className='md:w-5/12 lg:w-4/12  '
                />

                <div
                  className='w-full max-w-[400px] flex text-sm mt-1 items-center
                  justify-evenly text-red-800 gap-4 flex-wrap px-3'
                >
                  {amountBox.map((t: any) => (
                    <span
                      key={t.id}
                      className={boxStyle}
                      onClick={() => handleSetValue(t.value, formik)}
                    >
                      {numberWithCommas(t.value)} تومان
                    </span>
                  ))}
                </div>

                <hr className='bg-black/20 mt-2 mb-2 h-1 w-11/12
                max-w-[700px] rounded-full' />
                <FormikControl
                  control='submitBTN'
                  title='پرداخت'
                  formik={formik}
                  disabled={formik.isSubmitting}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default Index;
