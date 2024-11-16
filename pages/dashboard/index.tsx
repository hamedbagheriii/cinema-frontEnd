import FormikControl from '@/components/formik/formikControl';
import Layout from '@/components/layout/dashboard/layout';
import { useToken } from '@/hooks/use-Token';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Yup from 'yup';


// ! formik dependency =>
const initalValues = {
  fristName: '',
  lastName: '',
  email: '',
  changePassword : false,
  o_password: '',
  u_password: '',
};

const onSubmit = (values: any, action: any, router: any) => {
  console.log(values);
};

const validationSchema = Yup.object({
  fristName: Yup.string()
    .required('لطفا مقداری وارد کنید .')
    .min(2, 'حداقل 2 کارکتر وارد کنید .'),
  lastName: Yup.string()
    .required('لطفا مقداری وارد کنید .')
    .min(3, 'حداقل 3 کارکتر وارد کنید .'),
  email: Yup.string()
    .required('لطفا مقداری وارد کنید .')
    .email('لطفا ایمیل معتبر وارد کنید .'),
});
// ! formik dependency <=


const Index = () => {
  const { isLoading, isUser } = useToken();
  const router = useRouter();

  return (
    <Layout>
      <div className='border shadow-lg rounded-2xl '>
        <Formik
          initialValues={initalValues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions, router);
          }}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form className='flex flex-col py-6 gap-4 w-full justify-center items-center'>
                <div className='flex flex-col items-center justify-center'>
                  <i
                    className='bi bi-person-circle text-red-800'
                    style={{ fontSize: 70 }}
                  ></i>
                  <span className='text-center text-[20px] -mt-2 text-red-800 font-bold'>
                    اطلاعات کاربری
                  </span>
                </div>
                <hr className='bg-black/20 h-1 my-2 w-11/12 max-w-[700px] rounded-full' />

                <FormikControl
                  control='input'
                  label='نام'
                  placeholder='مثال : رضا'
                  name='fristName'
                  type='text'
                />

                <FormikControl
                  control='input'
                  label='نام خانوادگی'
                  placeholder='مثال : احمدی'
                  name='lastName'
                  type='text'
                />

                <FormikControl
                  control='input'
                  label='ایمیل'
                  placeholder='مثال : example@gmail.com'
                  name='email'
                  type='text'
                  disabled={true}
                />

                <FormikControl
                  control='switch'
                  name='changePassword'
                  label='تغییر رمز عبور'
                  className='mt-2'
                />

                {formik.values.changePassword && (
                  <>
                    <FormikControl
                      control='input'
                      name='o_password'
                      type='text'
                      placeholder='مثال : ghasuf23'
                      label='رمز عبور فعلی'
                    />

                    <FormikControl
                      control='input'
                      name='u_password'
                      type='text'
                      placeholder='مثال : ghasem12'
                      label='رمز عبور جدید'
                    />
                  </>
                )}

                <hr className='bg-black/20 mt-4 mb-2 h-1 w-11/12 max-w-[700px] rounded-full' />
                <FormikControl
                  control='submitBTN'
                  title='ویرایش اطلاعات'
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
