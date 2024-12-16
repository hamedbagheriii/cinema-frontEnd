import { TokenData } from '@/atoms/atoms';
import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import { deleteuserService, getUsersService } from '@/services/dashboard/users/users';
import { getWalletsService } from '@/services/dashboard/wallets/wallets';
import Action from '@/utils/action';
import { hasAccess } from '@/utils/hasAccess';
import LoadingData from '@/utils/loadingData';
import { numberWithCommas } from '@/utils/numWCommas';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [wallets, setWallets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const [isUser] = useAtom(TokenData);

  // ! handle get Users =>
  const handleGetUsers = async () => {
    setIsLoading(true);
    const res = await getWalletsService();

    if (res.data.success === true) {
      setWallets(res.data.wallets);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleEditData = (rowData: any) => {
    router.push({
      pathname: 'wallets/edit',
      query: {
        data: JSON.stringify({
          email: rowData.email,
          Amount: rowData.Amount,
          id: rowData.id,
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
    { field: 'email', title: 'ایمیل' },
    {
      field: null,
      title: 'مقدار (تومان)',
      element: (row: any) => {
        return numberWithCommas(row.Amount);
      },
    },
    {
      field: null,
      title: 'عملیات',
      element: (row: any) => {
        return (
          <Action
            handleEditData={
              hasAccess('edit-wallets', isUser.roles) ? handleEditData : null
            }
            target='کیف پول'
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
    <TableLayout title='مدیریت کیف پول ها' icon='wallet2'>
      <div>
        <PaginationTable
          data={wallets}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'email', value: 'ایمیل کاربر را جستجو کنید . . .' }}
        />
      </div>
    </TableLayout>
  );
};

export default Index;
