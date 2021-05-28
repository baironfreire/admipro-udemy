import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UserService,
    private _router: Router){

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isLogin = this._userService.isLogin();
    if (!isLogin){
      this._router.navigate(['/auth']);
    }else{
     
      return isLogin;
    }
  }
}
