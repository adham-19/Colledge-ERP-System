import { HttpInterceptorFn } from '@angular/common/http';

// نفس فكرة API.interceptors.request.use في redux/api/index.js:
// لو فيه user متخزن في localStorage، بنضيف الـ Authorization header تلقائيًا
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const raw = localStorage.getItem('user');
  if (raw) {
    const token = JSON.parse(raw)?.token;
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
  }
  return next(req);
};
