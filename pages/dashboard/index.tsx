import { useToken } from '@/hooks/use-Token';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Index = () => {
  const { isLoading, isUser } = useToken();
const router = useRouter()

  return (
    isLoading || isUser ? (
        <div>
            sd
        </div>
    ) : (
        router.push('/auth/login')
    )
  )
};

export default Index;
