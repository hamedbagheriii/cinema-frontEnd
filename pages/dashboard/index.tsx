import FormikControl from '@/components/formik/formikControl';
import Layout from '@/components/layout/dashboard/layout';
import { useToast } from '@/hooks/use-toast';
import { useToken } from '@/hooks/use-Token';
import { updatePassService, updateUserService } from '@/services/auth/auth';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
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

const onSubmit = async (values: any, action: any, router: any, toast: any) => {
  console.log(values);
  const handleShowAlert = (title: string, bgColor: string, status: string) => {
    setTimeout(() => {
      toast({
        title,
        status,
        duration: 2000,
        className: `bg-${bgColor} text-white shadow-md
        border-0 shadow-${bgColor}`,
        dir: 'rtl',
      });
    }, 1000);
  };

  try {
    let res: any;

    if (values.changePassword) {
      res = await updatePassService({
        o_password: values.o_password,
        u_password: values.u_password,
      });
    } else {
      res = await updateUserService({
        fristName: values.fristName,
        lastName: values.lastName,
      });
    }

    if (res.status === 200) {
      console.log(res);

      handleShowAlert('ویرایش با موفقیت انجام شد !', 'green-600', 'success');
    } else {
      handleShowAlert(res.response.data.message || res.message, 'red-600', 'error');
    }
  } catch (error: any) {
    console.log(error);
    handleShowAlert(error.response.data.message || error.message, 'red-600', 'error');
  } finally {
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
  const router = useRouter();
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
  const boxStyle = 'flex flex-col items-center md:flex-row justify-center w-full gap-4';

  return (
    <Layout>
      <div className='border shadow-lg rounded-2xl '>
        <Formik
          initialValues={reinitalValues || initalValues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions, router, toast);
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
                    className='md:w-5/12 lg:w-4/12'
                  />

                  <FormikControl
                    control='input'
                    label='نام خانوادگی'
                    placeholder='مثال : احمدی'
                    name='lastName'
                    type='text'
                    className='md:w-5/12 lg:w-4/12'
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
                />

                <FormikControl
                  control='switch'
                  name='changePassword'
                  label='تغییر رمز عبور'
                  className='mt-2'
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
                    />

                    <FormikControl
                      control='input'
                      name='u_password'
                      type='password'
                      placeholder='مثال : ghasem12'
                      label='رمز عبور جدید'
                      className='md:w-5/12 lg:w-4/12'
                    />
                  </div>
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
