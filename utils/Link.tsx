import Link from 'next/link';
import React, { FC } from 'react';

interface LinkProps {
  title: string;
  linkClass?: string;
  iconClass?: string;
  path : string;
  dir ?: string;
}
const LinkCompo: FC<LinkProps> = ({ title, linkClass, iconClass , path , dir='ltr'}) => {
  return (
    <Link dir={dir} href={path} className={`py-3 flex font-normal
    hover:bg-black/50 transition-all duration-150 rounded-md ${linkClass}`}>
      <i className={`me-2 bi bi-${iconClass}`} style={{ fontSize: 17 }}></i>
      {title}
    </Link>
  );
};

export default LinkCompo;
