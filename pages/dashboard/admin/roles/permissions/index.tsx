import { TokenData } from '@/atoms/atoms';
import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addAllPermsService, getPermService } from '@/services/dashboard/roles/roles';
import { hasAccess } from '@/utils/hasAccess';
import LoadingData from '@/utils/loadingData';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [perms, setPerms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const [isUser] = useAtom(TokenData);
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

  // ! handle add all Perms
  const handleAddAllPerms = async () => {
    const res = await addAllPermsService();

    if (res.data.success === true) {
      handleShowAlert(
        'تمام دسترسی ها به دیتابیس با موفقیت افزوده شد .',
        true,
        'success',
        toast
      );
    } else {
      handleShowAlert(
        res.response?.data.message || res.data.message,
        false,
        'error',
        toast
      );
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

  return isLoading ? (
    <div dir='rtl' className='w-11/12 mx-auto mt-10'>
      <LoadingData />
    </div>
  ) : (
    <TableLayout title='مشاهده مجوز ها' icon='shield-lock'>
      <div>
        <PaginationTable
          data={perms}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'permName', value: 'نام مجوز را جستجو کنید . . .' }}
        >
          <div className='flex w-full  sm:hidden md:flex max-w-sm items-center mb-7 space-x-2'>
            {hasAccess('allAccess', isUser.roles) ? (
              <Button
                onClick={() => handleAddAllPerms()}
                className='bg-red-700 hover:bg-red-800 shadow-md
               shadow-red-900 w-full sm:w-fit ms-auto text-[14px] '
              >
                افزودن تمام دسترسی ها
              </Button>
            ) : null}
          </div>
        </PaginationTable>
      </div>
    </TableLayout>
  );
};

export default Index;
