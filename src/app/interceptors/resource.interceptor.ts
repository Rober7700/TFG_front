import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../core/services/token.service';

@Injectable()
export class ResourceInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  claseAdmin(url:string):boolean{
    return url.includes('resource') || url.includes('almacen') || url.includes('api')|| url.includes('carrito');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let intReq = request;
    const token = this.tokenService.getAccessToken();
    if(token != null && this.claseAdmin(request.url)) {
      intReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(intReq);
  }
}