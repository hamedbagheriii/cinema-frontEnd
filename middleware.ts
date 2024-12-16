import { NextRequest, NextResponse } from 'next/server';
import { checkUserService } from './services/auth/auth';
import { hasAccess } from './utils/hasAccess';

export const middleware = async (req: NextRequest) => {
  const checkToken = await checkUserService(req.cookies);

  if (!checkToken.success && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  } else if (checkToken.success && req.nextUrl.pathname.startsWith('/dashboard/admin')) {
    const URLS = [
      {
        path: '/cinema/cinemaInfo',
        role: hasAccess('get-cinema', checkToken.data.roles),
      },
      {
        path: '/cinema/cinemaInfo/action',
        role:
          (hasAccess('edit-cinema', checkToken.data.roles) ||
            hasAccess('add-cinema', checkToken.data.roles)) &&
          hasAccess('get-cinema', checkToken.data.roles),
      },
      {
        path: '/cinema/cinemaInfo/hall',
        role:
          hasAccess('get-hall', checkToken.data.roles) &&
          hasAccess('get-cinema', checkToken.data.roles),
      },
      {
        path: '/cinema/cinemaInfo/movies',
        role:
          hasAccess('add-movie-cinema', checkToken.data.roles) &&
          hasAccess('get-cinema', checkToken.data.roles),
      },
      { path: '/cinema/movies', role: hasAccess('get-movie', checkToken.data.roles) },
      {
        path: '/cinema/movies/add',
        role:
          hasAccess('add-movie', checkToken.data.roles) &&
          hasAccess('get-movie', checkToken.data.roles),
      },
      {
        path: '/cinema/movies/edit',
        role:
          hasAccess('edit-movie', checkToken.data.roles) &&
          hasAccess('get-movie', checkToken.data.roles),
      },
      { path: '/cinema/tickets', role: hasAccess('get-tickets', checkToken.data.roles) },
      {
        path: '/cinema/tickets/seats',
        role: hasAccess('get-tickets', checkToken.data.roles),
      },
      {
        path: '/roles/permissions',
        role:
          hasAccess('get-perm', checkToken.data.roles) &&
          hasAccess('get-role', checkToken.data.roles),
      },
      {
        path: '/roles/rolesInfo',
        role:
          hasAccess('get-perm', checkToken.data.roles) &&
          hasAccess('get-role', checkToken.data.roles),
      },
      {
        path: '/roles/rolesInfo/action',
        role:
          (hasAccess('edit-role', checkToken.data.roles) ||
            hasAccess('add-role', checkToken.data.roles)) &&
          hasAccess('get-perm', checkToken.data.roles) &&
          hasAccess('get-role', checkToken.data.roles),
      },
      { path: '/users/usersInfo', role: hasAccess('get-users', checkToken.data.roles) },
      {
        path: '/users/usersInfo/add',
        role:
          hasAccess('add-users', checkToken.data.roles) &&
          hasAccess('get-users', checkToken.data.roles),
      },
      {
        path: '/users/usersInfo/edit',
        role:
          hasAccess('edit-users', checkToken.data.roles) &&
          hasAccess('get-users', checkToken.data.roles),
      },
      { path: '/users/wallets', role: hasAccess('get-wallets', checkToken.data.roles) },
      {
        path: '/users/wallets/edit',
        role:
          hasAccess('edit-wallets', checkToken.data.roles) &&
          hasAccess('get-wallets', checkToken.data.roles),
      },
    ];

    const data = URLS.filter(
      (t: any) => req.nextUrl.pathname === `/dashboard/admin${t.path}`
    )[0];
    
    if (data !== undefined && !data.role) {
      return NextResponse.redirect(new URL('/dashboard/admin', req.url));
    }
  } else if (checkToken.success && req.nextUrl.pathname.startsWith('/dashboard')) {
    if (
      req.nextUrl.pathname.startsWith('/dashboard/user') &&
      hasAccess('show', checkToken.data.roles) === true
    ) {
      return NextResponse.redirect(new URL('/dashboard/admin', req.url));
    } else if (
      req.nextUrl.pathname.startsWith('/dashboard/admin') &&
      hasAccess('show', checkToken.data.roles) === false
    ) {
      return NextResponse.redirect(new URL('/dashboard/user/profile', req.url));
    }
  } else if (
    checkToken.success &&
    req.nextUrl.pathname.startsWith('/auth') &&
    !req.nextUrl.pathname.startsWith('/auth/logout')
  ) {
    return NextResponse.redirect(new URL('/dashboard/user/profile', req.url));
  } else if (!checkToken.success && req.nextUrl.pathname.startsWith('/event')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
};

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/event/:path*'],
};
