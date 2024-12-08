import { ConfirmAlert } from '@/components/AlertCompo';
import TooltipCompo from '@/components/tooltipCompo';
import React, { FC } from 'react';

interface actionProps {
  handleDeteleData: any;
  handleEditData: any;
  target: string;
  rowData: any;
  AdditionData?: any[] | null;
}
const Action: FC<actionProps> = ({
  handleDeteleData,
  handleEditData,
  target,
  rowData,
  AdditionData = null,
}) => {
  const classStyle = ' text-[16px] cursor-pointer';
  return (
    <div className='flex px-2 flex-row justify-center gap-4 items-center'>
      <span>
        <ConfirmAlert
          onClick={() => handleDeteleData(rowData)}
          title={`آیا از حذف ${target} ${rowData.id} اطمینان دارید ؟`}
        >
          <i className={`bi bi-trash3 ${classStyle} text-red-600`}></i>
        </ConfirmAlert>
      </span>
      <TooltipCompo sideOffset={10} title={`ویرایش ${target}`}>
        <i
          onClick={() => handleEditData(rowData)}
          className={`bi bi-pencil-square ${classStyle} text-orange-500`}
        ></i>
      </TooltipCompo>
      {AdditionData &&
        AdditionData.map((t) => (
          <TooltipCompo key={`${t.title}_${t.icon}`} sideOffset={10} title={`${t.title}`}>
            <i
              onClick={() => t.function(rowData)}
              className={`bi bi-${t.icon} ${classStyle} ${t.color}`}
            ></i>
          </TooltipCompo>
        ))}
    </div>
  );
};

export default Action;
