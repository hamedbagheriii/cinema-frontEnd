export const hasAccess = (role: string, userRoles: any[]): any => {
  if (userRoles.length <= 0) {
    return {
      message: 'شما دسترسی به این صفحه را ندارید !',
      success: false,
    };
  } else if (role == 'all') {
    return true;
  } else {
    const handleCheck = () => {
      let allPerms: any[] = [];

      userRoles.map((t: any) => {
        const perms = t.roleData.permissions;
        allPerms.push(...perms);
      });

      const checkRole = allPerms.filter(
        (t) =>
          t.permissionData.permName === role ||
         t.permissionData.permName === 'allAccess'
      )[0];

      if (checkRole) return true;

      return false;
    };

    return handleCheck();
  }
};
