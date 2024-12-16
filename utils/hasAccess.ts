export const hasAccess = (role: string, userRoles: any[]): any => {
  const length = userRoles.length;
  
  if (length <= 0) {
    return false;
  } else if (role === 'show' && length > 0) {
    return true;
  } else if (
    length > 0 &&
    userRoles[0].roleData.permissions?.[0]
    ?.permissionData?.permName === 'allAccess'
  ) {
    return true;
  } else {
    let allPerms: any[] = [];

    userRoles.map((t: any) => {
      const perms = t.roleData.permissions;
      allPerms.push(...perms);
    });

    const checkRole = allPerms.filter((t) => t.permissionData.permName === role)[0];
    if (checkRole) return true;

    return false;
  }
};
