import Layout from '@/components/auth/layout';
import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import FormikInput from '@/components/formik/input';
import SubmitBtn from '@/components/formik/submitButton';

// ! dependencies
const initalvalues = {
  email: '',
  password: '',
};

const onSubmit = (values: any, actions: any) => {
  console.log(values);
};
// ! dependencies

const Login = () => {
  return (
    <Layout>
      <div dir='rtl' className='w-11/12 md:w-6/12 h-fit py-5 max-w-96 rounded-lg bg-white shadow-2xl'>
        <div className='flex flex-col items-center justify-center '>
          <i className='bi bi-person-circle text-[70px] text-red-700'></i>
          <span className='text-[20px] -mt-4 font-bold text-red-700'>ورود به حساب</span>
        </div>
        <Formik
          initialValues={initalvalues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions);
          }}
        >
          {(formik: FormikProps<any>) => {
            return (
              <Form className='flex flex-col gap-5 items-center pt-6 pb-3 border-t-2 mt-5 justify-center '>
                <FormikInput
                  name='email'
                  type='email'
                  placeholder='ایمیل'
                  label='ایمیل'
                  control='email'
                />
                <FormikInput
                  name='password'
                  type='password'
                  placeholder='رمز عبور'
                  label='رمز عبور'
                  control='password'
                />

                <SubmitBtn control='' formik={formik} title='ورود'
                 className='w-9/12 mt-4 bg-red-700 hover:bg-red-800
                 mx-auto ' />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default Login;
