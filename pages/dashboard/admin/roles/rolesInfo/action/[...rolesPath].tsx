import AddHeaderCompo from '@/components/addHeaderCompo';
import { handleShowAlert } from '@/components/AlertCompo';
import FormikControl from '@/components/formik/formikControl';
import SubmitCompo from '@/components/submitCompo';
import { useToast } from '@/hooks/use-toast';
import {
  addRoleService,
  editRoleService,
  getPermService,
} from '@/services/dashboard/roles/roles';
import LoadingData from '@/utils/loadingData';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// ! formik dependencies
const initalvalues = {
  roleName: '',
  roleDec: '',
  permissions: [],
  permArry: [],
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
    const data = {
      roleName: values.roleName,
      roleDec: values.roleDec,
      permissions: values.permissions,
    };

    if (reinitalvalues) res = await editRoleService(data,reinitalvalues.id);
    else res = await addRoleService(data);

    if (res.status === 200) {
      handleShowAlert(
        `نقش با نام ${values.roleName} با موفقیت ${
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
  roleName: Yup.string()
    .min(2, 'حداقل 2 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  roleDec: Yup.string()
    .min(10, 'حداقل 10 کاراکتر وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
  permissions: Yup.array()
    .min(1, 'حداقل 1 مقدار وارد کنید .')
    .required('این فیلد الزامی میباشد .'),
});
// ! formik dependencies

const Add = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [reinitalvalues, setReinitialvalues] = useState<any | null>(null);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { rolesPath } = router.query;

  // ! handle get perms =>
  const handleGetPerms = async () => {
    const res = await getPermService();

    setData(
      res.data.perm.map((t: any) => {
        return {
          id: t.id,
          permName: t.permName,
        };
      })
    );

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  //  ! handle edit data =>
  const handleEditData = async () => {
    const data = await JSON.parse(router.query.data as string);
    const dataPerms = data.permissions.map((t: any) => t.permissionData.id);

    setReinitialvalues({
      id: data.id,
      roleName: data.roleName,
      roleDec: data.roleDec,
      permissions: dataPerms,
      permArry: [],
    });
  };

  useEffect(() => {
    if (rolesPath?.[0] === 'edit') {
      handleEditData();
    }
  }, [rolesPath]);

  useEffect(() => {
    handleGetPerms();
  }, []);

  return isLoading ? (
    <div dir='rtl' className='w-11/12 mx-auto mt-10'>
      <LoadingData />
    </div>
  ) : (
    <AddHeaderCompo
      title={reinitalvalues ? 'ویرایش نقش' : 'افزودن نقش'}
      icon='shield-shaded'
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
                name='roleName'
                type='text'
                placeholder='مثال : مدیر یک'
                label='نام نقش'
                control='input'
              />

              <FormikControl
                name='roleDec'
                type='text'
                placeholder='مثال : مدیر کاربران'
                label='توضیحات'
                control='teaxtArea'
              />

              {data && (
                <FormikControl
                  name='permArry'
                  label='مجوز ها'
                  control='checkbox'
                  formik={formik}
                  targetName='permissions'
                  reinitalvalues={reinitalvalues}
                  data={data}
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

export default Add;
