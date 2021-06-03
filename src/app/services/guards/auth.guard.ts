import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { LocalStorageService } from '../shared/loca-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UserService,
    private _storage: LocalStorageService,
    private _router: Router){

  }
  canActivate(){
    const isLogin = this._userService.isLogin();
    console.log('islogin', isLogin);
    if(!isLogin){
      this._router.navigate(['/auth']);
    }
    return isLogin;
    
  }
}
