import { useEffect, useState } from 'react';

export const useAccess = (role: string): any => {
  // const { isUser } = useToken();
  // const [res, setRes] = useState<any>(null);
  // const [userRoles, setUserRoles] = useState<any>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // const handleCheck = () => {
  //   if (userRoles !== null && userRoles.length > 0) {
  //     let allPerms: any[] = [];

  //     userRoles.map((t: any) => {
  //       const perms = t.roleData.permissions;
  //       allPerms.push(...perms);
  //     });

  //     let checkRole: any = allPerms.map((t) => t.permissionData.permName);
  //     if (checkRole.includes('allAccess')) {
  //       setRes(true);
  //     }
  //     else{
  //       checkRole = checkRole.includes(role);
  //       setRes(checkRole);
  //     }

  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isUser && isUser.roles) {
  //     setUserRoles(isUser.roles);
  //   }
  // }, [isUser]);

  // useEffect(() => {
  //   if (userRoles !== null) {
  //     handleCheck();
  //   }
  // }, [userRoles]);

  return { res : true };
};
