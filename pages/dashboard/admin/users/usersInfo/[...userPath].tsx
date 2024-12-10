import AddHeaderCompo from '@/components/addHeaderCompo';
import { handleShowAlert } from '@/components/AlertCompo';
import FormikControl from '@/components/formik/formikControl';
import SubmitCompo from '@/components/submitCompo';
import { useToast } from '@/hooks/use-toast';
import { addUserService, editUserService } from '@/services/dashboard/users/users';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// ! formik dependencies
const initalvalues = {
  email: '',
  password: '',
  fristName: '',
  lastName: '',
  addPassword: true,
};

const onSubmit = async (
  values: any,
  actions: any,
  toast: any,
  router: any,
  reinitalvalues: null | any
) => {
  try {
    let res;
    const data : any = {
      fristName: values.fristName,
      lastName: values.lastName,
      email: values.email,
    };

    if (reinitalvalues) res = await editUserService(data);
    else {
      data.password = values.password;
      res = await addUserService(values);
    }

    if (res.status === 200) {
      handleShowAlert(
        `کاربر با ایمیل ${values.email} با موفقیت ${
          reinitalvalues ? 'ویرایش' : 'اضافه'
        } شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        router.back();
      }, 2000);
    } else {
      handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
    }
  } catch (error: any) {
    handleShowAlert(error.response.data.message || error.message, false, 'error', toast);
  } finally {
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  }
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('لطفا فرمت ایمیل ( reza@gmail.com ) را رعایت کنید .')
    .required('این فیلد الزامی میباشد .'),
  addPassword: Yup.boolean(),
  password: Yup.string().when('addPassword', {
    is: (value: any) => value,
    then: () =>
      Yup.string()
        .min(6, 'حداقل 6 کاراکتر وارد کنید .')
        .required('این فیلد الزامی میباشد .'),
  }),
  fristName: Yup.string()
    .min(2, 'حداقل 2 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  lastName: Yup.string()
    .min(3, 'حداقل 3 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
});
// ! formik dependencies

const UserPath = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [reinitalvalues, setReinitialvalues] = useState<any | null>(null);
  const { userPath } = router.query;

  //  ! handle edit data =>
  const handleEditData = async () => {
    const data = await JSON.parse(router.query.data as string);

    setReinitialvalues(data);
  };

  useEffect(() => {
    if (userPath?.[0] === 'edit') {
      handleEditData();
    }
  }, [userPath]);

  return (
    <AddHeaderCompo
      title={reinitalvalues ? 'ویرایش کاربر' : 'افزودن کاربر'}
      icon={reinitalvalues ? 'person-gear' : 'person-add'}
    >
      <Formik
        initialValues={reinitalvalues || initalvalues}
        onSubmit={(values, actions) => {
          onSubmit(values, actions, toast, router, reinitalvalues);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {(formik: any) => {
          return (
            <Form className='w-full flex flex-col items-center justify-evenly gap-y-4'>
              <FormikControl
                name='fristName'
                type='text'
                placeholder='مثال : رضا'
                label='نام'
                control='input'
              />

              <FormikControl
                name='lastName'
                type='text'
                placeholder='مثال : احمدی'
                label='نام خانوادگی'
                control='input'
              />

              <FormikControl
                name='email'
                type='text'
                placeholder='مثال : reza@gmail.com'
                label='ایمیل'
                control='input'
                disabled={reinitalvalues}
              />

              {!reinitalvalues && (
                <FormikControl
                  name='password'
                  type='text'
                  placeholder='مثال : reza1213'
                  label='رمز عبور'
                  control='input'
                />
              )}

              <SubmitCompo
                router={router}
                reinitalvalues={reinitalvalues}
                formik={formik}
              />
            </Form>
          );
        }}
      </Formik>
    </AddHeaderCompo>
  );
};

export default UserPath;
