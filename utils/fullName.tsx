import React, { FC } from 'react';

interface fullNameProps {
  isUser: any;
  className?: string;
  icon?: boolean;
}
const FullName: FC<fullNameProps> = ({ isUser, className, icon = false }) => {
  return (
    <span className={className}>
      {`${isUser?.fristName}  ${isUser?.lastName}`}
      {icon && <i className='bi bi-person-circle ms-2' style={{ fontSize: 17 }}></i>}
    </span>
  );
};

export default FullName;
