import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public user: Usuario;
  constructor(public _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService._user;
  }

}
