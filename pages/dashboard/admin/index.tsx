import Layout from '@/components/layout/dashboard/layout';
import { useToken } from '@/hooks/use-Token';
import React, { useEffect, useState } from 'react';



const Index = () => {
  const { isLoading, isUser } = useToken();

  return (
    <Layout>
      <div className='border shadow-lg rounded-2xl '>
      <span>admin : {isUser?.fristName}</span>
      </div>
    </Layout>
  );
};

export default Index;
