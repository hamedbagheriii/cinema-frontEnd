import Layout from '@/components/auth/layout';
import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import FormikControl from '@/components/formik/formikControl';
import * as Yup from 'yup';



// ! formik dependencies
const initalvalues = {
  email: '',
  password: '',
};

const onSubmit = (values: any, actions: any) => {
  console.log(values);
};

const validationSchema = Yup.object({
  email : Yup.string().email('لطفا فرمت ایمیل را رعایت کنید .')
  .required('این فیلد الزامی میباشد .'),

  password : Yup.string().required('این فیلد الزامی میباشد .')
  .min(6,'حداقل 6 کاراکتر وارد کنید .')
})
// ! formik dependencies



const Login = () => {
  return (
    <Layout>
      <div
        dir='rtl'
        className='w-11/12 md:w-6/12 h-fit py-5 max-w-96 rounded-lg bg-white shadow-black/50 shadow-2xl'
      >
        <div className='flex flex-col items-center justify-center '>
          <i className='bi bi-person-circle text-[70px] text-red-700'></i>
          <span className='text-[20px] -mt-4 font-bold text-red-700'>ورود به حساب</span>
        </div>

        <Formik
          initialValues={initalvalues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions);
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
              </Form>
            );
          }}
        </Formik>

      </div>
    </Layout>
  );
};

export default Login;
