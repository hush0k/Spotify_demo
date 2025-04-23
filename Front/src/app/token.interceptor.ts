import { HttpInterceptorFn } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {AuthService} from './services/auth.service';
import {catchError, switchMap, throwError} from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  const isAuthRequest =
    req.url.includes('/login') || req.url.includes('/register') || req.url.includes('/users');

  if (isAuthRequest) return next(req);

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401 && auth.getRefreshToken()) {
        return auth.refreshToken().pipe(
          switchMap((newToken) => {
            auth.saveToken(newToken);
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            auth.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => err);
    })
  );

};
