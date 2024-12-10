import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import { getPermService } from '@/services/dashboard/roles/roles';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [perms, setPerms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

  // ! handle get Roles =>
  const handleGetRoles = async () => {
    setIsLoading(true);
    const res = await getPermService();

    if (res.data.success === true) {
      setPerms(res.data.perms);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };


  useEffect(() => {
    handleGetRoles();
  }, []);

  // ! handle dataInfo =>
  const dataInfo = [
    { field: 'id', title: 'آیدی' },
    { field: 'permName', title: 'نام' },
    { field: 'category', title: 'دسته بندی' },
  ];

  return (
    <TableLayout title='مشاهده مجوز ها' icon='shield-lock'>
      <div>
        <PaginationTable
          data={perms}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'permName', value: 'نام مجوز را جستجو کنید . . .' }}
        />
      </div>
    </TableLayout>
  );
};

export default Index;
