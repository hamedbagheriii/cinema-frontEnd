import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import { deleteRoleService, getRolesService } from '@/services/dashboard/roles/roles';
import Action from '@/utils/action';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

  // ! handle get Roles =>
  const handleGetRoles = async () => {
    setIsLoading(true);
    const res = await getRolesService();

    if (res.data.success === true) {
      setRoles(res.data.roles);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleDeteleData = async (rowData: any) => {
    const res = await deleteRoleService(rowData.id);
    if (res.data?.success === true) {
      handleShowAlert(
        `نقش با آیدی ${rowData.id} ( ${rowData.roleName} ) با موفقیت حذف شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        handleGetRoles();
      }, 1000);
    } else {
      handleShowAlert('عملیات با خطا مواجه شد ! ', false, 'error', toast);
    }
  };

  const handleEditData = (rowData: any) => {
    router.push({
      pathname: 'rolesInfo/action/edit',
      query: {
        data: JSON.stringify({
          id: rowData.id,
          roleName: rowData.roleName,
          roleDec: rowData.roleDec,
          permissions: rowData.permissions,
        }),
      },
    });
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  // ! handle dataInfo =>
  const dataInfo = [
    { field: 'id', title: 'آیدی' },
    { field: 'roleName', title: 'نام' },
    { field: 'roleDec', title: 'توضیحات' },
    {
      field: null,
      title: 'عملیات',
      element: (row: any) => {
        return (
          <Action
            handleDeteleData={handleDeteleData}
            handleEditData={handleEditData}
            target='نقش'
            rowData={row}
          />
        );
      },
    },
  ];

  return (
    <TableLayout title='مدیریت نقش ها' icon='shield-shaded'>
      <div>
        <PaginationTable
          data={roles}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'roleName', value: 'نام نقش را جستجو کنید . . .' }}
          addItem='rolesInfo/action/add'
        />
      </div>
    </TableLayout>
  );
};

export default Index;
