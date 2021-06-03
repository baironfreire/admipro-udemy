import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpService } from '../http/http.service';
import { HttpRequestHandler } from '../../models/http-model';
import { environment } from '../../../environments/environment';
import { ILogin } from '../../interfaces/login.reponse.interface';
import { LocalStorageService } from '../shared/loca-storage.service';
import { isNull } from 'util';
import { Router } from '@angular/router';

const HEADERS = {};

@Injectable()
export class UserService {

  constructor(private httpProvider: HttpService,
    private _storage: LocalStorageService,
    private _router: Router) { 
    console.log('Servicio de usuario listo');
    HEADERS["Content-Type"] = 'application/json'
  }

  public registerUser(usuario: Usuario, httpRequestHandler: HttpRequestHandler): void {
    httpRequestHandler.headers = HEADERS;
    this.httpProvider.post(environment.apiv1.usuario, usuario, httpRequestHandler);
  }

  public login(usuario: Usuario, httpRequestHandler: HttpRequestHandler): void {
    httpRequestHandler.headers = HEADERS;
    this.httpProvider.post(environment.apiv1.login, usuario, httpRequestHandler);
  }

  public logout() {
    this._storage.remove('token');
    this._storage.remove('usuario');
    this._storage.remove('id');
    this._router.navigate(['/auth']);
  }

  public saveSession(response: ILogin): Promise<boolean> {
    const p = new Promise<boolean>((resolve, reject) => {
      try {
        this._storage.setNumber('id', response.id);
        this._storage.setString('token', response.token);
        this._storage.setJson('user', response.usuario);
        resolve(true);
      } catch (error) {
        console.log('Error => ', error);
        reject({
          type: 'error',
          message: 'Error creando la sessión del usuario',
        });
      }
      
    });
    return p;
  }

  public remember(response: ILogin, remember:boolean = false): Promise<boolean> {
    const p = new Promise<boolean>((resolve, reject) => {
      try {
        if (remember){
          this._storage.setString('email', response.usuario.email);
          this._storage.setBoolean('remember', remember);
          resolve(true);
        }else{
         this._storage.remove('email');
         this._storage.setBoolean('remember', remember);
         resolve(false);
        }
      } catch (error) {
        console.log('error', error);
        reject({
          type: 'error',
          message: 'Se presento un error al recordar el usuario'
        });
      }
      
    });
    return p;
  }

  public isRemember(): boolean {
    return this._storage.getBoolean('remember');
  }

  public getToken(): string {
    return this._storage.getString('token');
  }

  public getUser(): any {
    return this._storage.getJson('user');
  }

  public getId(): number {
    return this._storage.getNumber('id');
  }

  public getEmail(): string {
    return this._storage.getString('email');
  }

  public isLogin(): boolean {
   return (this.getToken())? true : false;
  }



 







}
