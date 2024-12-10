import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import { deleteuserService, getUsersService } from '@/services/dashboard/users/users';
import { getWalletsService } from '@/services/dashboard/wallets/wallets';
import Action from '@/utils/action';
import { numberWithCommas } from '@/utils/numWCommas';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [wallets, setWallets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

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
          Amount : rowData.Amount,
          id : rowData.id,
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
            handleEditData={handleEditData}
            target='کیف پول'
            rowData={row}
            targetKey='email'
          />
        );
      },
    },
  ];

  return (
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
