import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpService } from '../http/http.service';
import { HttpRequestHandler } from '../../models/http-model';
import { environment } from '../../../environments/environment';
import { ILogin } from '../../interfaces/login.reponse.interface';
import { LocalStorageService } from '../shared/loca-storage.service';
import { isNull } from 'util';
import { Router } from '@angular/router';
import { UploadFileService } from '../shared/upload-file.service';
import { UploadResponse } from '../../interfaces/upload-response.interface';
import { AlertService } from '../shared/alert.service';

const HEADERS = {};

@Injectable()
export class UserService {
  public _id: string;
  public  _user: Usuario;
  public  _token: string;
  public _email: string;

  constructor(
    private httpProvider: HttpService,
    private _storage: LocalStorageService,
    private _router: Router,
    private _uploadService: UploadFileService,
    private _alertService: AlertService) { 
    console.log('Servicio de usuario listo');
    HEADERS["Content-Type"] = 'application/json';
    HEADERS["Accept"] = 'application/json';

    this._user = this.getUser();
    this._token = this.getToken();
    this._id = this.getId();
    this._email = this.getEmail();

  }

  public registerUser(usuario: Usuario, httpRequestHandler: HttpRequestHandler): void {
    httpRequestHandler.headers = HEADERS;
    this.httpProvider.post(environment.apiv1.usuario, usuario, httpRequestHandler);
  }

  public login(usuario: Usuario, httpRequestHandler: HttpRequestHandler): void {
    httpRequestHandler.headers = HEADERS;
    this.httpProvider.post(environment.apiv1.login, usuario, httpRequestHandler);
  }

  public update(user:Usuario, httpRequestHandler: HttpRequestHandler): void {
    httpRequestHandler.headers = HEADERS;
    this.httpProvider.put(`${environment.apiv1.usuario}/${user._id}?token=${this.getToken()}`, user, httpRequestHandler)
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
        this._storage.setString('id', response.id);
        this._storage.setString('token', response.token);
        this._storage.setJson('user', response.usuario);
        this._id = response.id;
        this._user = response.usuario;
        console.log('user', this._user);
        this._token = response.token;
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

  private getToken(): string {
    return (this._token)? this._token : this._storage.getString('token');
  }

  private getUser(): Usuario {
    return (this._user)? this._user : this._storage.getJson('user');
  }

  private getId(): string { 
    return (this._id)? this._id : this._storage.getString('id');
  }

  private getEmail(): string {
    return this._storage.getString('email');
  }

  public isLogin(): boolean {
   return (this.getToken())? true : false;
  }


  public imagenChange(file:File, id: string){
    this._uploadService.uploadFile(file, 'usuarios', id).then(
      (resp: UploadResponse) => {
        console.log('resp', resp);
        this._user = this.getUser();
        this._user.img = resp.usuario.img
        resp.token =  this.getToken();
        resp.id = id;
        this._alertService.open({
          title: resp.type,
          text: resp.message,
          type: resp.type
        });
        this.saveSession(resp)
      }
    ).catch((e) => {
      console.log('resp', e);
    });
  }



}
