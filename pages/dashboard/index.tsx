import { handleGetUser } from '@/redux/User/userAction';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
    const dispatch : any = useDispatch();

    useEffect(() => {
        dispatch(handleGetUser());
    }, []);
    const {user , loading} = useSelector((state : any)=>state.user);

    
    return (
        <div>

        </div>
    );
}

export default Index;
