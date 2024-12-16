import { TokenData } from '@/atoms/atoms';
import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import { deleteuserService, getUsersService } from '@/services/dashboard/users/users';
import Action from '@/utils/action';
import { hasAccess } from '@/utils/hasAccess';
import LoadingData from '@/utils/loadingData';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();
  const [isUser] = useAtom(TokenData);

  // ! handle get Users =>
  const handleGetUsers = async () => {
    setIsLoading(true);
    const res = await getUsersService();

    if (res.data.success === true) {
      setUsers(res.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleDeteleData = async (rowData: any) => {
    const res = await deleteuserService(rowData.id, { email: rowData.email });
    if (res.data?.success === true) {
      handleShowAlert(
        `کاربر با ایمیل ${rowData.email} با موفقیت حذف شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        handleGetUsers();
      }, 1000);
    } else {
      handleShowAlert('عملیات با خطا مواجه شد ! ', false, 'error', toast);
    }
  };

  const handleEditData = (rowData: any) => {
    router.push({
      pathname: 'usersInfo/edit',
      query: {
        data: JSON.stringify({
          fristName: rowData.fristName,
          lastName: rowData.lastName,
          email: rowData.email,
          addPassword: false,
          roles: rowData.roles.map((t: any) => {
            return t.roleID;
          }),
        }),
      },
    });
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  // ! handle dataInfo =>

  const dataInfo = [
    { field: 'id', title: 'آیدی' },
    { field: 'fristName', title: 'نام' },
    { field: 'lastName', title: 'نام خانوادگی' },
    { field: 'email', title: 'ایمیل' },
    {
      field: null,
      title: 'عملیات',
      element: (row: any) => {
        return (
          <Action
            handleDeteleData={
              hasAccess('delete-users', isUser.roles) ? handleDeteleData : null
            }
            handleEditData={hasAccess('edit-users', isUser.roles) ? handleEditData : null}
            target='کاربر'
            rowData={row}
            targetKey='email'
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
    <TableLayout title='مدیریت کاربران' icon='people'>
      <div>
        <PaginationTable
          data={users}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'email', value: 'ایمیل کاربر را جستجو کنید . . .' }}
          addItem={hasAccess('add-users', isUser.roles) ? 'usersInfo/add' : null}
        />
      </div>
    </TableLayout>
  );
};

export default Index;
