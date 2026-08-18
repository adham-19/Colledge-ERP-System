import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";

import { inject } from "@angular/core";

import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
  finalize,
} from "rxjs";

import { AuthService } from "../services/auth.service";

let isRefreshing = false;

const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes("/auth/refresh")) {
    return next(req);
  }

  const token = authService.token;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((newToken) => {
            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            return next(retryRequest);
          }),
        );
      }

      isRefreshing = true;
      refreshTokenSubject.next(null);

      return authService.refreshToken().pipe(
        switchMap((response) => {
          const newToken = response.accessToken;

          authService.updateToken(newToken);

          refreshTokenSubject.next(newToken);

          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          return next(retryRequest);
        }),

        catchError((refreshError) => {
          refreshTokenSubject.next(null);

          authService.sessionExpired();

          return throwError(() => refreshError);
        }),

        finalize(() => {
          isRefreshing = false;
        }),
      );
    }),
  );
};
