import { TokenData } from '@/atoms/atoms';
import { ConfirmAlert, handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import {
  deleteTicketService,
  getAllTicketService,
} from '@/services/dashboard/tickets/tickets';
import Action from '@/utils/action';
import { convertDate } from '@/utils/convertDate';
import { hasAccess } from '@/utils/hasAccess';
import LoadingData from '@/utils/loadingData';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();
  const [isUser] = useAtom(TokenData);

  // ! handle get tickets =>
  const handleGetTickets = async () => {
    setIsLoading(true);
    const res = await getAllTicketService();

    if (res.data.success === true) {
      const resData = res.data.data.map((t: any) => {
        return {
          ...t,
          ticket: t.ticket.toString(),
        };
      });

      setTickets(resData);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleDeteleData = async (rowData: any) => {
    const res = await deleteTicketService(rowData.ticket);
    if (res.data?.success === true) {
      handleShowAlert(
        `بلیط با کد ${rowData.ticket} با موفقیت حذف شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        handleGetTickets();
      }, 1000);
    } else {
      handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
    }
  };

  useEffect(() => {
    handleGetTickets();
  }, []);

  // ! handle dataInfo =>
  const AdditionData = [
    {
      title: 'صندلی ها',
      color: 'text-blue-800',
      icon: 'ui-checks-grid',
      access : 'get-tickets',
      function: (rowData: any) => {
        router.push({
          pathname: 'tickets/seats',
          query: {
            data: JSON.stringify({
              rows: rowData.rows,
              ticket: rowData.ticket,
            }),
          },
        });
      },
    },
  ];
  const dataInfo = [
    { field: 'ticket', title: 'کد' },
    {
      field: null,
      title: 'آیدی کاربر',
      element: (row: any) => {
        return <span className='px-3'>{`${row.userData.id}`}</span>;
      },
    },
    {
      field: null,
      title: 'سینما',
      element: (row: any) => {
        return <>{`${row.cinemaData.cinemaName}`}</>;
      },
    },
    {
      field: null,
      title: 'سالن',
      element: (row: any) => {
        return <>{`${row.hallData.hallName}`}</>;
      },
    },
    {
      field: null,
      title: 'آدرس',
      element: (row: any) => {
        return (
          <>{`${row.cinemaData.province} ,
      ${row.cinemaData.city} | ${row.cinemaData.address}`}</>
        );
      },
    },
    {
      field: null,
      title: 'ساعت',
      element: (row: any) => {
        return <>{`${row.Time}`}</>;
      },
    },
    {
      field: null,
      title: 'تاریخ',
      element: (row: any) => {
        return <>{`${convertDate(row.date)}`}</>;
      },
    },
    {
      field: null,
      title: 'فیلم',
      element: (row: any) => {
        return <>{`${row.movieData.movieName}`}</>;
      },
    },
    {
      field: null,
      title: 'تعداد صندلی',
      element: (row: any) => {
        return <>{`${row.rows.length}`}</>;
      },
    },
    {
      field: null,
      title: 'وضعیت',
      element: (row: any) => {
        return (
          <span className={`${row.useTicket ? 'text-green-700' : 'text-red-700'}`}>{`${
            row.useTicket ? 'نهایی شده' : 'نهایی نشده'
          }`}</span>
        );
      },
    },
    {
      field: null,
      title: 'عملیات',
      element: (row: any) => {
        return (
          <Action
            handleDeteleData={
              hasAccess('delete-tickets', isUser.roles) ? handleDeteleData : null
            }
            AdditionData={AdditionData}
            target='بلیط'
            rowData={row}
            targetKey='ticket'
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
    <TableLayout title='مدیریت بلیط ها' icon='ticket-perforated'>
      <div>
        <PaginationTable
          data={tickets}
          dataInfo={dataInfo}
          numOfPage={15}
          isLoading={isLoading}
          searchField={{ target: 'ticket', value: 'کد بلیط را جستجو کنید . . .' }}
        />
      </div>
    </TableLayout>
  );
};

export default Index;
