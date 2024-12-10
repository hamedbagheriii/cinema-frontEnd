import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import {
  deleteCinemaService,
  getCinemasService,
} from '@/services/dashboard/cinema/cinema';
import { deleteuserService, getUsersService } from '@/services/dashboard/users/users';
import Action from '@/utils/action';
import ChipsData from '@/utils/chipsData';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

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
    const res = await deleteuserService(rowData.id ,
    { email: rowData.email });
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
            handleDeteleData={handleDeteleData}
            handleEditData={handleEditData}
            target='کاربر'
            rowData={row}
            targetKey='email'
          />
        );
      },
    },
  ];

  return (
    <TableLayout title='مدیریت کاربران' icon='people'>
      <div>
        <PaginationTable
          data={users}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'email', value: 'ایمیل کاربر را جستجو کنید . . .' }}
          addItem='usersInfo/add'
        />
      </div>
    </TableLayout>
  );
};

export default Index;
