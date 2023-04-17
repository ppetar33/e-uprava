import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable, Injector } from '@angular/core';
  import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
  
  @Injectable({
    providedIn: 'root',
  })
  export class JwtInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      let tokenService = this.injector.get(TokenService);
      let tokenizedReq = req.clone({
        setHeaders: {
          Token: `${tokenService.getToken()}`,
        },
      });
      return next.handle(tokenizedReq);
    }
  }