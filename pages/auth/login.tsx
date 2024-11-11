import Layout from '@/components/auth/layout';
import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import FormikInput from '@/components/formik/input';

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
      <div dir='rtl' className='w-6/12 h-fit py-3 rounded-lg bg-slate-50 shadow-md'>
        <div className='flex flex-col items-center justify-center '>
          <i className='bi bi-person-circle text-[70px] text-red-700'></i>
          <span className='text-[20px] -mt-5 font-bold text-red-700'>ورود به حساب</span>
        </div>
        <Formik
          initialValues={initalvalues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions);
          }}
        >
          {(formik: FormikProps<any>) => {
            return (
              <Form className='flex flex-col gap-4 items-center pt-4 border-t-2 mt-5 justify-center '>
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


              </Form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default Login;
