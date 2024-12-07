import FormikControl from '@/components/formik/formikControl';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

// ! formik dependencies
const initalvalues = {
  cinemaName: '',
  province: '',
  city: '',
  address: '',
  image: null,
};

// const onSubmit = async (values: any, actions: any, toast: any, router: any) => {
//   try {
//     const res: any = await loginUserService(values);
//     if (res.status === 200) {
//       localStorage.setItem('userToken', res.data.token);
//       Cookies.set('userToken', res.data.token);

//       handleShowAlert(
//         'شما با موفقیت وارد حساب کاربری خود شدید !',
//         true,
//         'success',
//         toast
//       );

//       setTimeout(() => {
//         router.push('/');
//       }, 3000);
//     } else {
//       Cookies.remove('userToken');
//       localStorage.removeItem('userToken');

//       handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
//     }
//   } catch (error: any) {
//     handleShowAlert(error.response.data.message || error.message, false, 'error', toast);

//     localStorage.removeItem('userToken');
//     Cookies.remove('userToken');
//   } finally {
//     setTimeout(() => {
//       actions.setSubmitting(false);
//     }, 1000);
//   }
// };

const validationSchema = Yup.object({
  cinemaName: Yup.string()
    .min(2, 'حداقل 2 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  province: Yup.string()
    .min(3, 'حداقل 3 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  city: Yup.string()
    .min(2, 'حداقل 2 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  address: Yup.string()
    .min(10, 'حداقل 10 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  image: Yup.mixed().required('این فیلد الزامی میباشد .'),
});
// ! formik dependencies
const CinemaPath = () => {
  return (
    <div
      dir='rtl'
      className='w-full h-full flex flex-col items-center justify-start px-4 py-5'
    >
      <Formik
        initialValues={initalvalues}
        onSubmit={(value) => {
          console.log(value);
        }}
        validationSchema={validationSchema}
      >
        {(formik: any) => {
            console.log(formik.values);
            
          return (
            <Form className='w-full h-full flex flex-col items-center justify-evenly gap-y-4'>
              <FormikControl
                name='cinemaName'
                type='text'
                placeholder='مثال : مادر'
                label='نام سینما'
                control='input'
              />

              <FormikControl
                name='province'
                type='text'
                placeholder='مثال : خوزستان'
                label='استان'
                control='input'
              />

              <FormikControl
                name='city'
                type='text'
                placeholder='مثال : دزفول'
                label='شهر'
                control='input'
              />

              <FormikControl
                control='teaxtArea'
                name='address'
                placeholder='مثال : بلوار پیام آوران . . . '
                label='آدرس'
              />

              <FormikControl
                name='image'
                label='عکس سینما'
                control='file'
                formik={formik}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CinemaPath;
