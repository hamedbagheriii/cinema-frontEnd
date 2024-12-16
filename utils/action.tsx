import { ConfirmAlert } from '@/components/AlertCompo';
import TooltipCompo from '@/components/tooltipCompo';
import React, { FC } from 'react';
import { hasAccess } from './hasAccess';
import { TokenData } from '@/atoms/atoms';
import { useAtom } from 'jotai';

interface actionProps {
  handleDeteleData?: any;
  handleEditData?: any;
  target: string;
  rowData: any;
  AdditionData?: any[] | null;
  targetKey?: string;
}
const Action: FC<actionProps> = ({
  handleDeteleData = null,
  handleEditData = null,
  target,
  rowData,
  AdditionData = null,
  targetKey = 'id',
}) => {
  const [isUser] = useAtom(TokenData);
  const classStyle = ' text-[16px] cursor-pointer';

  return handleDeteleData || handleEditData || AdditionData ? (
    <div className='flex px-2 flex-row justify-center gap-4 items-center'>
      {handleDeteleData && (
        <span>
          <ConfirmAlert
            onClick={() => handleDeteleData(rowData)}
            title={`آیا از حذف ${target} ${rowData[targetKey]} اطمینان دارید ؟`}
          >
            <i className={`bi bi-trash3 ${classStyle} text-red-600`}></i>
          </ConfirmAlert>
        </span>
      )}
      {handleEditData && (
        <TooltipCompo sideOffset={10} title={`ویرایش ${target}`}>
          <i
            onClick={() => handleEditData(rowData)}
            className={`bi bi-pencil-square ${classStyle} text-orange-500`}
          ></i>
        </TooltipCompo>
      )}
      {AdditionData &&
        AdditionData.map((t) => {
          if (hasAccess(t?.access, isUser?.roles)) {
            return (
              <TooltipCompo
                key={`${t.title}_${t.icon}`}
                sideOffset={10}
                title={`${t.title}`}
              >
                <i
                  onClick={() => t.function(rowData)}
                  className={`bi bi-${t.icon} ${classStyle} ${t.color}`}
                ></i>
              </TooltipCompo>
            );
          }
        })}
    </div>
  ) : '-' ;
};

export default Action;
