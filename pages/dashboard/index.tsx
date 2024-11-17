import FormikControl from '@/components/formik/formikControl';
import Layout from '@/components/layout/dashboard/layout';
import { useToast } from '@/hooks/use-toast';
import { useToken } from '@/hooks/use-Token';
import { updatePassService, updateUserService } from '@/services/auth/auth';
import { handleShowAlert } from '@/utils/AlertCompo';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// ! formik dependency =>
const initalValues = {
  fristName: '',
  lastName: '',
  email: '',
  changePassword: false,
  o_password: '',
  u_password: '',
};

const onSubmit = async (values: any, action: any, toast: any) => {
  console.log(values);

  //  request =>
  try {
    let res: any;

    //  check update user or password request =>
    if (values.changePassword) {
      res = await updatePassService({
        o_password: values.o_password,
        u_password: values.u_password,
        lastName : values.lastName,
        fristName : values.fristName,
      });
    } 
    else {
      res = await updateUserService({
        fristName: values.fristName,
        lastName: values.lastName,
      });
    }

    //  check request =>
    if (res.status === 200) {
      console.log(res);

      handleShowAlert('ویرایش با موفقیت انجام شد !', true,
      'success', toast);
    } 
    else {
      handleShowAlert(res.response.data.message || res.message,
      false, 'error', toast);
    }
  } 
  catch (error: any) {
    handleShowAlert(error.response.data.message || error.message,
  false, 'error', toast);
  } 
  finally {
    setTimeout(() => {
      action.setSubmitting(false);
    }, 1000);
  }
};

const validationSchema = Yup.object({
  fristName: Yup.string()
    .required('لطفا مقداری وارد کنید .')
    .min(2, 'حداقل 2 کارکتر وارد کنید .'),
  changePassword: Yup.boolean(),
  lastName: Yup.string()
    .required('لطفا مقداری وارد کنید .')
    .min(3, 'حداقل 3 کارکتر وارد کنید .'),
  email: Yup.string()
    .required('لطفا مقداری وارد کنید .')
    .email('لطفا ایمیل معتبر وارد کنید .'),
  o_password: Yup.string().when('changePassword', {
    is: true,
    then: () =>
      Yup.string()
        .required('رمز عبور فعلی الزامی میباشد .')
        .min(6, 'حداقل 6 کاراکتر مورد نیاز است .'),
  }),
  u_password: Yup.string().when('changePassword', {
    is: true,
    then: () =>
      Yup.string()
        .required('رمز عبور جدید الزامی میباشد .')
        .min(6, 'حداقل 6 کاراکتر مورد نیاز است .'),
  }),
});
// ! formik dependency <=

const Index = () => {
  const { isLoading, isUser } = useToken();
  const [reinitalValues, setReinitialValues] = useState<any>(null);
  const { toast } = useToast();

  // ! handle get User data =>
  const handleGetData = async () => {
    setReinitialValues({
      fristName: isUser?.fristName || '',
      lastName: isUser?.lastName || '',
      email: isUser?.email || '',
      changePassword: false,
      o_password: '',
      u_password: '',
    });
  };

  useEffect(() => {
    handleGetData();
  }, [isUser]);

  // style for box =>
  const boxStyle = 'flex flex-col items-center md:flex-row justify-center w-full gap-4 ';

  return (
    <Layout>
      <div className='border shadow-lg rounded-2xl '>
        <Formik
          initialValues={reinitalValues || initalValues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions, toast);
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
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

                <div className={boxStyle}>
                  <FormikControl
                    control='input'
                    label='نام'
                    placeholder='مثال : رضا'
                    name='fristName'
                    type='text'
                    className='md:w-5/12 lg:w-4/12  '
                    padding={true}
                  />

                  <FormikControl
                    control='input'
                    label='نام خانوادگی'
                    placeholder='مثال : احمدی'
                    name='lastName'
                    type='text'
                    className='md:w-5/12 lg:w-4/12'
                    padding={true}
                  />
                </div>

                <FormikControl
                  control='input'
                  label='ایمیل'
                  placeholder='مثال : example@gmail.com'
                  name='email'
                  type='text'
                  disabled={true}
                  className='lg:w-4/12'
                  padding={true}
                />

                <FormikControl
                  control='switch'
                  name='changePassword'
                  label='تغییر رمز عبور'
                  className='md:-mt-5 md:mb-2'
                />

                {formik.values.changePassword && (
                  <div className={`${boxStyle} min-h-12 `}>
                    <FormikControl
                      control='input'
                      name='o_password'
                      type='password'
                      placeholder='مثال : ghasuf23'
                      label='رمز عبور فعلی'
                      className='md:w-5/12 lg:w-4/12'
                      padding={true}
                    />

                    <FormikControl
                      control='input'
                      name='u_password'
                      type='password'
                      placeholder='مثال : ghasem12'
                      label='رمز عبور جدید'
                      className='md:w-5/12 lg:w-4/12'
                      padding={true}
                    />
                  </div>
                )}

                <hr className='bg-black/20 mt-4 mb-2 h-1 w-11/12 max-w-[700px] rounded-full' />
                <FormikControl
                  control='submitBTN'
                  title='ویرایش اطلاعات'
                  formik={formik}
                  disabled={formik.isSubmitting || !formik.dirty}
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
