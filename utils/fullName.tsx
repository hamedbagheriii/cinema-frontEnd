import React, { FC } from 'react';

interface fullNameProps {
  isUser: any;
  className?: string;
  icon?: boolean;
}
const FullName: FC<fullNameProps> = ({ isUser, className, icon = false }) => {
  return (
    <span dir='ltr' className={`${className}`}>
      {icon && <i className='bi bi-person-circle me-2' style={{ fontSize: 17 }}></i>}
      {`${isUser?.fristName}  ${isUser?.lastName}`}
    </span>
  );
};

export default FullName;
