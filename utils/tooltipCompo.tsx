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
}
const TooltipCompo : FC<TooltipProps> = ({ children, title }) => {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className='ms-7 shadow-sm shadow-red-900' sideOffset={1}>
          <p className='text-white'>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCompo;
