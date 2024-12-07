import { ConfirmAlert } from '@/components/AlertCompo';
import TooltipCompo from '@/components/tooltipCompo';
import React, { FC } from 'react';

interface actionProps {
  handleDeteleData: any;
  handleEditData: any;
  target: string;
  rowData: any;
}
const Action: FC<actionProps> = ({
  handleDeteleData,
  handleEditData,
  target,
  rowData,
}) => {
  const classStyle = 'text-red-600 text-[16px] cursor-pointer';
  return (
    <div className='flex flex-row justify-center gap-4 items-center'>
      <TooltipCompo sideOffset={10} title={`حذف ${target}`}>
        <ConfirmAlert
          onClick={() => handleDeteleData(rowData)}
          title={`آیا از حذف ${target} ${rowData.id} اطمینان دارید ؟`}
        >
          <i className={`bi bi-trash3 ${classStyle}`}></i>
        </ConfirmAlert>
      </TooltipCompo>
      <TooltipCompo sideOffset={10} title={`ویرایش ${target}`}>
        <i
          onClick={() => handleEditData(rowData)}
          className={`bi bi-pencil-square ${classStyle} text-orange-400`}
        ></i>
      </TooltipCompo>
    </div>
  );
};

export default Action;
