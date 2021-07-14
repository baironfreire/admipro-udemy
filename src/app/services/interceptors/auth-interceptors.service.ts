import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { String } from 'typescript-string-operations';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor{
  public token: string;
  constructor(private _user: UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this._user._token;
    if(!String.IsNullOrWhiteSpace(this.token)){
      req = req.clone({
        setHeaders: {
          Authorization: `token ${this.token}`
        }
      });
    }
    return next.handle(req);
  }
}
