import { Cookies } from "@/services/service";

export const localToken = () => {
    const Token = localStorage.getItem('userToken') || false;
    
    if (Token) {
        Cookies.set('userToken', Token);
    }
    else{
        Cookies.remove('userToken');
    }
}