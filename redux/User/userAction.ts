import { getUserDataService } from "@/services/auth/auth"
import { GET_USER_ERROR, GET_USER_LOADING, GET_USER_RESPONSE } from "./userType"
import { Cookies } from "@/services/service"

export const getUserLoading = ()=>{
    return {
        type : GET_USER_LOADING 
    }
}

export const getUserResponse = (data : any)=>{
    return {
        type : GET_USER_RESPONSE ,
        payLoad : data
    }
}

export const getUserError = (err : any)=>{
    return {
        type : GET_USER_ERROR ,
        payLoad : err
    }
}


export const handleGetUser = () => {
    return async (dispatch : any) => {
        dispatch(getUserLoading());
        const res = await getUserDataService();
        if (res.status === 200) {
          setTimeout(() => {
            dispatch(getUserResponse(res.data));
          }, 1500);
        } else {
          dispatch(getUserError(res.data.message || 'مشکلی سمت سرور رخ داده است !'));
    
          Cookies.remove('userToken');
        }
    };
};
  