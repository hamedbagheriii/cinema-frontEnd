import { useToken } from '@/hooks/use-Token';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Index = () => {
  const { isLoading, isUser } = useToken();
    const router = useRouter()


  return (
    <div>
        s
    </div>
  )
};

export default Index;
