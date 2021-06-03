import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private _userService: UserService,
    private _router: Router){}
    
    canActivate()  {
      const  isLogin =  this._userService.isLogin();
      if(!isLogin){
        return true;
      }
      this._router.navigate(['/dashboard']);
      return false;

    }
}
