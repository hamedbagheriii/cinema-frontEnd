import Layout from '@/components/layout/auth/layout';
import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import FormikControl from '@/components/formik/formikControl';
import { registerUserService } from '@/services/auth/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Link from 'next/link';

// ! formik dependencies
const initalvalues = {
  email: '',
  password: '',
  fristName: '',
  lastName: '',
};

const onSubmit = async (values: any, actions: any, toast: any, router: any) => {
  const res = await registerUserService(values);
  if (res.status === 200) {
    setTimeout(() => {
      toast({
        title: 'حساب کاربری شما با موفقیت ساخته شد !',
        status: 'success',
        duration: 3000,
        className: `bg-green-500 text-white shadow-lg
        border-0 shadow-green-800`,
        dir: 'rtl',
      });
    }, 1000);

    setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
  } else {
    actions.setIsSubmiting(false);
  }
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('لطفا فرمت ایمیل را رعایت کنید .')
    .required('این فیلد الزامی میباشد .'),

  firstName: Yup.string()
    .required('این فیلد الزامی میباشد .')
    .min(2, 'حداقل 2 کاراکتر وارد کنید .'),

  lastName: Yup.string()
    .required('این فیلد الزامی میباشد .')
    .min(3, 'حداقل 3 کاراکتر وارد کنید .'),

  password: Yup.string()
    .required('این فیلد الزامی میباشد .')
    .min(6, 'حداقل 6 کاراکتر وارد کنید .'),
});
// ! formik dependencies

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Layout title={'ثبت نام حساب'} icon={'bi bi-person-fill-add'}>
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
                  name='fristName'
                  type='text'
                  placeholder='مثال : حامد'
                  label='نام'
                  control='input'
                />

                <FormikControl
                  name='lastName'
                  type='text'
                  placeholder='مثال : باقری'
                  label='نام خانوادگی'
                  control='input'
                />

                <FormikControl
                  name='password'
                  type='password'
                  placeholder='مثال : hamed351'
                  label='رمز عبور'
                  control='input'
                />

                <FormikControl
                  control='submitBTN'
                  formik={formik}
                  title='ثبت نام'
                  className='w-9/12 mt-4'
                />

                <Link href='/auth/login' className='text-sm'>
                  حساب کاربری دارید ؟{' '}
                  <span className='text-red-700'>ورود به حساب . . .</span>
                </Link>
              </Form>
            );
          }}
        </Formik>
      </>
    </Layout>
  );
};

export default Register;
