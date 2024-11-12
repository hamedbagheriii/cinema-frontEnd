import Layout from '@/components/layout/auth/layout';
import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import FormikControl from '@/components/formik/formikControl';
import * as Yup from 'yup';
import { loginUserService } from '@/services/auth/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ! formik dependencies
const initalvalues = {
  email: '',
  password: '',
};

const onSubmit = async (values: any, actions: any, toast: any, router: any) => {
  const res = await loginUserService(values);
  if (res.status === 200) {
    setTimeout(() => {
      toast({
        title: 'شما با موفقیت وارد حساب کاربری خود شدید !',
        status: 'success',
        duration: 3000,
        className: `bg-green-500 text-white shadow-lg
        border-0 shadow-green-800`,
        dir: 'rtl',
      });
    }, 1000);

    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  } else {
    actions.setIsSubmiting(false);
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
                  حساب کاربری ندارید ؟{' '}
                  <span className='text-red-700'>ثبت نام . . .</span>
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
