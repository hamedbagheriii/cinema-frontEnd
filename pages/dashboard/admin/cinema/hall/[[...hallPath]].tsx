import AddHeaderCompo from '@/components/addHeaderCompo';
import { handleShowAlert } from '@/components/AlertCompo';
import FormikControl from '@/components/formik/formikControl';
import SubmitCompo from '@/components/submitCompo';
import { useToast } from '@/hooks/use-toast';
import { addHallService } from '@/services/dashboard/cinema/cinema';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// ! formik dependencies
const onSubmit = async (
  values: any,
  actions: any,
  toast: any,
  router: any,
  reinitalvalues?: null | any
) => {
  try {
    let res = await addHallService(values);

    if (res.status === 200) {
      handleShowAlert(
        `سالن با نام ${values.hallName} با موفقیت ${
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
  cinemaID: Yup.number().required('این فیلد الزامی میباشد .'),
  hallName: Yup.string()
    .min(3, 'حداقل 3 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  maximumRows: Yup.number()
    .required('این فیلد الزامی میباشد .')
    .typeError('لطفا مقدار عددی وارد کنید .'),
  maximumCol: Yup.number()
    .required('این فیلد الزامی میباشد .')
    .typeError('لطفا مقدار عددی وارد کنید .'),
});
// ! formik dependencies

const HallPath = () => {
  const router = useRouter();
  const { toast } = useToast();
  const data = router.query.data as any;
  const [initalvalues, setInitalvalues] = useState<any>({
    cinemaID: 1,
    hallName: '',
    maximumRows: 1,
    maximumCol: 1,
  });

  // ! handle set data =>
  const handleSetData = async () => {
    const dataObj = await JSON.parse(data);
    setInitalvalues({ ...initalvalues, cinemaID: dataObj.id });
  };

  useEffect(() => {
    if (data) {
      handleSetData();
    }
  }, [data]);

  return (
    <AddHeaderCompo title='سالن ها' icon='door-open'>
      <div className='w-full flex flex-col items-center justify-center'>
        {/* add or edit hall */}
        <div className='w-full'>
          <Formik
            initialValues={initalvalues}
            onSubmit={(values, actions) => {
              onSubmit(values, actions, toast, router);
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {(formik: any) => {
              return (
                <Form className='w-full flex flex-col items-center justify-evenly gap-y-4'>
                  <FormikControl
                    name='hallName'
                    type='text'
                    placeholder='مثال : آوان'
                    label='نام سالن'
                    control='input'
                  />

                  <div className='w-full flex'>
                    <FormikControl
                      name='maximumRows'
                      type='number'
                      placeholder='مثال : 12'
                      label='تعداد ردیف ها'
                      control='input'
                      className='w-5/12'
                    />

                    <FormikControl
                      name='maximumCol'
                      type='number'
                      placeholder='مثال : 8'
                      label='تعداد ستون ها'
                      control='input'
                      className='w-5/12'
                    />
                  </div>

                  <SubmitCompo router={router} formik={formik} className={'mt-3'} />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </AddHeaderCompo>
  );
};

export default HallPath;
