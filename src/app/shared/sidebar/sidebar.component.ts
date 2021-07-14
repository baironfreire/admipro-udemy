import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public user:Usuario;
  constructor(public _sidebarService: SidebarService,
    public _userService: UserService) {
    console.log('Menu', _sidebarService.menu);
  }

  ngOnInit() {
    this.user = this._userService._user
  }

}
