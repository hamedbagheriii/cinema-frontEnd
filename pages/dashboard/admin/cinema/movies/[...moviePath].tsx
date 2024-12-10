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
  movieName: '',
  decription: '',
  time: '',
  price: '',
  createdAt: '',
  image: null,
};

// const onSubmit = async (
//   values: any,
//   actions: any,
//   toast: any,
//   router: any,
//   reinitalvalues: null | any
// ) => {
//   try {
//     // ! handle add data =>
//     const formData = new FormData();
//     Object.keys(values).forEach((key) => {
//       if (key !== 'id') {
//         formData.append(key, values[key]);
//       }
//     });
//     let res: any;

//     if (reinitalvalues) res = await editCinemaService(formData, reinitalvalues.id);
//     else res = await addCinemaService(formData);

//     if (res.status === 200) {
//       handleShowAlert(
//         `سینما با نام ${values.cinemaName} با موفقیت ${
//           reinitalvalues ? 'ویرایش' : 'اضافه'
//         } شد . `,
//         true,
//         'success',
//         toast
//       );

//       setTimeout(() => {
//         router.back();
//       }, 2000);
//     } else {
//       handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
//     }
//   } catch (error: any) {
//     handleShowAlert(error.response.data.message || error.message, false, 'error', toast);
//   } finally {
//     setTimeout(() => {
//       actions.setSubmitting(false);
//     }, 1000);
//   }
// };

const validationSchema = Yup.object({
  movieName: Yup.string()
    .min(2, 'حداقل 2 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  decription: Yup.string()
    .min(10, 'حداقل 10 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  time: Yup.string()
    .matches(/^\d+((:\d+)*|-\d+)?$/, 'لطفا قالب فرمت 00:00 را رعایت کنید .')
    .length(5, 'حداقل 5 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  price: Yup.string()
    .min(4, 'حداقل 4 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  createdAt: Yup.number()
    .test(
      'teck-number',
      'لطفا فرمت 0000 را رعایت کنید .',
      (value) => value?.toString().length === 4
    )
    .required('این فیلد الزامی میباشد .'),
  image: Yup.mixed()
    .required('این فیلد الزامی میباشد .')
    .test('check-image', 'این فیلد الزامی میباشد .', (value: any) => {
      if (value.type.startsWith('image')) return true;
      else return false;
    }),
});
// ! formik dependencies

const MoviePath = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [reinitalvalues, setReinitialvalues] = useState<any | null>(null);
  const { moviePath } = router.query;

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
    if (moviePath?.[0] === 'edit') {
      handleEditData();
    }
  }, [moviePath]);

  return (
    <AddHeaderCompo title={reinitalvalues ? 'ویرایش فیلم' : 'افزودن فیلم'} icon='film'>
      <Formik
        initialValues={reinitalvalues || initalvalues}
        onSubmit={(values, actions) => {
          //   onSubmit(values, actions, toast, router, reinitalvalues);
          console.log(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {(formik: any) => {
          return (
            <Form className='w-full flex flex-col items-center justify-evenly gap-y-4'>
              <FormikControl
                name='movieName'
                type='text'
                placeholder='مثال : زودپز'
                label='نام فیلم'
                control='input'
              />

              <FormikControl
                name='decription'
                type='text'
                placeholder='مثال : فیلمی زیبا'
                label='توضیحات فیلم'
                control='input'
              />

              <FormikControl
                name='time'
                type='text'
                placeholder='مثال : 20:30'
                label='زمان فیلم'
                control='input'
              />

              <FormikControl
                name='price'
                type='number'
                placeholder='مثال : 40000'
                label='قیمت'
                control='input'
              />

              <FormikControl
                name='createdAt'
                type='number'
                placeholder='مثال : 1402'
                label='سال انتشار'
                control='input'
              />

              <div className={`${formik.errors.image ? 'mb-2' : 'mb-12'} w-full`}>
                <FormikControl
                  name='image'
                  label='عکس فیلم'
                  control='file'
                  formik={formik}
                />
              </div>

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

export default MoviePath;
