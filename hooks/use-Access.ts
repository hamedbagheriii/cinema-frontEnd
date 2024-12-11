import { useToken } from '@/hooks/use-Token';
import { useEffect, useState } from 'react';

export const useAccess = (role: string): any => {
  const { isUser } = useToken();
  const [userRoles, setUserRoles] = useState<any>(null);
  const [res, setRes] = useState(false);

  const handleCheck = () => {
    if (userRoles.length <= 0) {
      setRes(false);
    } 
    else if (role === 'all') {
      setRes(true);
    } 
    else {
      let allPerms: any[] = [];

      userRoles.map((t: any) => {
        const perms = t.roleData.permissions;
        allPerms.push(...perms);
      });

      const checkRole = allPerms.filter(
        (t) => (t.permissionData.permName === role 
        || t.permissionData.permName === 'allAccess')
      )[0];

      if (checkRole) setRes(true);
      else setRes(false);
    }
  };

  useEffect(() => {
    if (isUser?.roles && isUser?.roles?.length > 0) {
      setUserRoles(isUser.roles);
    }
  }, [isUser]);

  useEffect(() => {
    if (userRoles) {
      handleCheck();
    }
  }, [userRoles]);

  return { res };
};
