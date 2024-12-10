import AddHeaderCompo from '@/components/addHeaderCompo';
import { handleShowAlert } from '@/components/AlertCompo';
import FormikControl from '@/components/formik/formikControl';
import SubmitCompo from '@/components/submitCompo';
import { useToast } from '@/hooks/use-toast';
import { addCinemaService, editCinemaService } from '@/services/dashboard/cinema/cinema';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// ! formik dependencies
const initalvalues = {
  cinemaName: '',
  province: '',
  city: '',
  address: '',
  image: null,
};

const onSubmit = async (
  values: any,
  actions: any,
  toast: any,
  router: any,
  reinitalvalues: null | any
) => {
  try {
    // ! handle add data =>
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'id') {
        formData.append(key, values[key]);
      }
    });
    let res: any;

    if (reinitalvalues) res = await editCinemaService(formData, reinitalvalues.id);
    else res = await addCinemaService(formData);

    if (res.status === 200) {
      handleShowAlert(
        `سینما با نام ${values.cinemaName} با موفقیت ${
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
  image: Yup.mixed()
    .required('این فیلد الزامی میباشد .')
    .test('check-image', 'این فیلد الزامی میباشد .', (value: any) => {
      if (value.type.startsWith('image')) return true;
      else return false;
    }),
});
// ! formik dependencies

const CinemaPath = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [reinitalvalues, setReinitialvalues] = useState<any | null>(null);
  const { cinemaPath } = router.query;

  //  ! handle edit data =>
  const handleEditData = async () => {
    const data = await JSON.parse(router.query.data as string);

    setReinitialvalues({
      id: data.id,
      cinemaName: data.cinemaName,
      province: data.province,
      city: data.city,
      address: data.address,
    });
  };

  useEffect(() => {
    if (cinemaPath?.[0] === 'edit') {
      handleEditData();
    }
  }, [cinemaPath]);

  return (
    <AddHeaderCompo
      title={reinitalvalues ? 'ویرایش سینما' : 'افزودن سینما'}
      icon='camera-reels'
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

              {!reinitalvalues && (
                <div className={`${formik.errors.image ? 'mb-2' : 'mb-12'} w-full`}>
                  <FormikControl
                    name='image'
                    label='عکس سینما'
                    control='file'
                    formik={formik}
                  />
                </div>
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

export default CinemaPath;
