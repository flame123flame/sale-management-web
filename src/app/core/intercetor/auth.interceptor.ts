// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    let apiReq = req;

    // ถ้าใช้ relative path → ต่อให้เป็น full URL
    const isRelative = req.url.startsWith('/');

    if (isRelative) {
        apiReq = req.clone({
            url: `${environment.api_url}${req.url}`
        });
    }

    // ตรวจว่าไม่ใช่ login
    const isLogin = apiReq.url.endsWith('/authenticate/login');

    if (token && !isLogin) {
        apiReq = apiReq.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        router.navigateByUrl('/auth/login');
    }

    return next(apiReq);
};
