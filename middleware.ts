import { NextRequest, NextResponse } from "next/server";
import { checkUserService } from "./services/auth/auth";
import { hasAccess } from "./utils/hasAccess";

export const middleware = async (req : NextRequest)=>{
    const checkToken = await checkUserService(req.cookies)
    
    if (!checkToken.success && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }    
    else if(checkToken.success && req.nextUrl.pathname.startsWith('/dashboard') ){
        if (req.nextUrl.pathname.startsWith('/dashboard/user') && 
            hasAccess('all', checkToken.data.roles) === true) {
            return NextResponse.redirect(new URL('/dashboard/admin', req.url))
        }
        else if (req.nextUrl.pathname.startsWith('/dashboard/admin') && 
            hasAccess('all', checkToken.data.roles) === false) {
            return NextResponse.redirect(new URL('/dashboard/user/profile', req.url))
        }
    }
    else if(checkToken.success && req.nextUrl.pathname.startsWith('/auth') &&
    !req.nextUrl.pathname.startsWith('/auth/logout') ){
        return NextResponse.redirect(new URL('/dashboard/user/profile', req.url))
    }
    else if(!checkToken.success && req.nextUrl.pathname.startsWith('/event')){
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }


}

export const config = {
    matcher: ["/dashboard/:path*","/auth/:path*","/event/:path*"]
}


