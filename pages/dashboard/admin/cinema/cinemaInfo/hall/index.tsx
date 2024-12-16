import { TokenData } from '@/atoms/atoms';
import AddHeaderCompo from '@/components/addHeaderCompo';
import { handleShowAlert } from '@/components/AlertCompo';
import FormikControl from '@/components/formik/formikControl';
import SubmitCompo from '@/components/submitCompo';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import {
  addHallService,
  deleteHallService,
  editHallService,
} from '@/services/dashboard/cinema/cinema';
import Action from '@/utils/action';
import ChipsData from '@/utils/chipsData';
import { hasAccess } from '@/utils/hasAccess';
import LoadingData from '@/utils/loadingData';
import { Form, Formik } from 'formik';
import { useAtom } from 'jotai';
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
    let res;

    if (reinitalvalues) {
      const data = {
        hallName: values.hallName,
        maximumRows: values.maximumRows,
        maximumCol: values.maximumCol,
      };
      res = await editHallService(data, values.id);
    } 
    else {
      res = await addHallService(values);
    }

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

const HallIndex = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data } = router.query as any;
  const [dataObj, setDataObj] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUser] = useAtom(TokenData);
  const [initalvalues, setInitalvalues] = useState<any>({
    cinemaID: 1,
    hallName: '',
    maximumRows: 1,
    maximumCol: 1,
  });
  const [reinitalvalues, setReinitialvalues] = useState<any>(null);

  // ! handle set data =>
  const handleSetData = async () => {
    const dataParse = await JSON.parse(data);
    setDataObj(dataParse);
    setInitalvalues({ ...initalvalues, cinemaID: dataParse.id });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // ! handle delete data =>
  const handleDeteleData = async (rowData: any) => {
    const res = await deleteHallService(rowData.id);
    if (res.data.success === true) {
      handleShowAlert(
        `سالن با آیدی ${rowData.id} ( ${rowData.hallName} ) با موفقیت حذف شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };

  // ! handle edit data =>
  const handleEditData = (rowData: any) => {
    setReinitialvalues(rowData);
  };

  // ! handle cancel edit =>
  const handleCancel = () => {
    setReinitialvalues(null);
  };

  useEffect(() => {
    if (data) {
      handleSetData();
    }
  }, [data]);

  // ! handle dataInfo =>
  const dataInfo = [
    { field: 'id', title: 'آیدی' },
    { field: 'hallName', title: 'نام' },
    { field: 'maximumRows', title: 'تعداد ردیف ها' },
    { field: 'maximumCol', title: 'تعداد ستون ها' },
    {
      field: null,
      title: 'عملیات',
      element: (row: any) => {
        return (
          <Action
            handleDeteleData={hasAccess('delete-hall', isUser.roles) ? handleDeteleData : null}
            handleEditData={handleEditData}
            target='سالن'
            rowData={row}
          />
        );
      },
    },
  ];

  return isLoading ? (
    <div dir='rtl' className='w-11/12 mx-auto mt-10'>
      <LoadingData />
    </div>
  ) : (
    <AddHeaderCompo
      dec={`سینما : ${dataObj.cinemaName}`}
      title='سالن ها'
      icon='door-open'
    >
      <div className='w-full flex flex-col items-center justify-center'>
        {/* add or edit hall */}
        <div className='w-full'>
          <Formik
            initialValues={reinitalvalues || initalvalues}
            onSubmit={(values, actions) => {
              onSubmit(values, actions, toast, router , reinitalvalues);
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

                  <SubmitCompo
                    reinitalvalues={reinitalvalues}
                    cancel={() => handleCancel()}
                    router={router}
                    formik={formik}
                    className={'mt-3'}
                    isCancel={reinitalvalues}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>

        <hr className='w-11/12 my-10 mx-auto bg-red-700  pt-1 rounded-full' />

        {/* show halls */}
        <div className='w-10/12 mx-auto '>
          <PaginationTable
            data={dataObj.halls}
            dataInfo={dataInfo}
            numOfPage={10}
            isLoading={isLoading}
          />
        </div>
      </div>
    </AddHeaderCompo>
  );
};

export default HallIndex;
