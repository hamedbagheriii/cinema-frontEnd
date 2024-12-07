import React, { FC, ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TooltipProps {
    children : ReactNode;
    title : string;
    sideOffset? : number;
}
const TooltipCompo : FC<TooltipProps> = ({ children, title , sideOffset = 1 }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className='ms-7 shadow-sm shadow-red-900' sideOffset={sideOffset}>
          <p className='text-white'>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCompo;
