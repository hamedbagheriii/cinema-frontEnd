export const handleShowAlert = (title: string, success: boolean, status: string , toast : any) => {
  setTimeout(() => {
    toast({
      title,
      status,
      duration: 2000,
      className: `${success ? 'bg-green-600' :
      'bg-red-600 '} shadow-black/50 border-2 border-black text-white shadow-md
       `,
      dir: 'rtl',
    });
  }, 1000);
};