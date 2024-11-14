import { getUserDataService } from "@/services/auth/auth";
import { useEffect, useState } from "react";

export const useToken = () => {
    const [isUser , setIsUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleCheckToken = async ()=>{
        const res = await getUserDataService();
        console.log(res);
        
        if (res?.status === 200) {
            setIsUser(res.data);
        } else {
            setIsUser(null);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }

    useEffect(() => {
        if (isUser === null) {
            handleCheckToken()
        }
    }, []);

    return {isUser, isLoading};
}