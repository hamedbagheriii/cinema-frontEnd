import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';


// handle check Link Active =>
export const handleCheckLink = (path: string , router : any) => {
  if (router.pathname.startsWith(path)) {
    return ' bg-black/80 font-bold ';
  }
};

interface LinkProps {
  title: string;
  linkClass?: string;
  iconClass?: string;
  path : string;
  dir ?: string;
  arrow ?: boolean;
  border ?: boolean;
}
const LinkCompo: FC<LinkProps> = ({ title, linkClass, iconClass , path , dir='ltr' , arrow = true , border = false}) => {
  const router = useRouter();

  return (
    <Link dir={dir} href={path} className={`py-3 pt-3.5 flex px-2 font-normal ${border && 'border-l-2 rounded-l-none border-white/50'}
    hover:bg-black/50 transition-all duration-150 rounded-md ${linkClass} ${handleCheckLink(path , router)}`}>
      <i className={`me-2 bi bi-${iconClass}`} style={{ fontSize: 17 }}></i>
      {title}
      {arrow && <i className={`bi bi-caret-${dir == 'rtl' ? 'left' : 'right'} mt-0.5 ms-auto`}></i>}
    </Link>
  );
};

export default LinkCompo;
