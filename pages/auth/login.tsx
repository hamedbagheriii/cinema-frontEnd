import Layout from '@/components/layout/auth/layout';
import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import FormikControl from '@/components/formik/formikControl';
import * as Yup from 'yup';
import { loginUserService } from '@/services/auth/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cookies } from '@/services/service';
import { handleShowAlert } from '@/utils/AlertCompo';

// ! formik dependencies
const initalvalues = {
  email: '',
  password: '',
};

const onSubmit = async (values: any, actions: any, toast: any, router: any) => {
  try {
    const res : any = await loginUserService(values);
    if (res.status === 200) {
      Cookies.set('userToken', res.data.token);

      handleShowAlert(
        'شما با موفقیت وارد حساب کاربری خود شدید !',
        true,
        'success',
        toast
      );
      setTimeout(() => {
        router.push('/dashboard/profile');
      }, 3000);
    } else {
      Cookies.remove('userToken');

      handleShowAlert(res.response.data.message || res.message,
      false, 'error', toast);
    }
  } 
  catch (error: any) {
    handleShowAlert(error.response.data.message ||
    error.message, false, 'error', toast);
  }
  finally {
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  }
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('لطفا فرمت ایمیل را رعایت کنید .')
    .required('این فیلد الزامی میباشد .'),

  password: Yup.string()
    .required('این فیلد الزامی میباشد .')
    .min(6, 'حداقل 6 کاراکتر وارد کنید .'),
});
// ! formik dependencies

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Layout title={'ورود به حساب'} icon={'bi bi-person-circle'}>
      <>
        <Formik
          initialValues={initalvalues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions, toast, router);
          }}
          validationSchema={validationSchema}
        >
          {(formik: FormikProps<any>) => {
            return (
              <Form className='flex flex-col gap-5 items-center pt-6 pb-3 border-t-2 mt-5 justify-center '>
                <FormikControl
                  control='input'
                  name='email'
                  type='text'
                  placeholder='مثال : alireza@gmail.com'
                  label='ایمیل'
                />
                <FormikControl
                  name='password'
                  type='password'
                  placeholder='مثال : alireza125'
                  label='رمز عبور'
                  control='input'
                />

                <FormikControl
                  control='submitBTN'
                  formik={formik}
                  title='ورود'
                  className='w-9/12 mt-4'
                />

                <Link href='/auth/register' className='text-sm'>
                  حساب کاربری ندارید ؟ <span className='text-red-700'>ثبت نام . . .</span>
                </Link>
              </Form>
            );
          }}
        </Formik>
      </>
    </Layout>
  );
};

export default Login;
