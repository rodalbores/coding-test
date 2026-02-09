import { HttpInterceptorFn } from '@angular/common/http';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  // only prefix relative URLs
  if (req.url.startsWith('http') || req.url.startsWith('/assets')) return next(req);
  return next(req.clone({ url: `/api${req.url.startsWith('/') ? '' : '/'}${req.url}` }));
};
