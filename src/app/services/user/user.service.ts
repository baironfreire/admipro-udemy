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

  public usuario: Usuario;
  public token: string;
  public id: string;

  constructor(private httpProvider: HttpService,
    private _storage: LocalStorageService,
    private _router: Router) { 
    console.log('Servicio de usuario listo');
    HEADERS["Content-Type"] = 'application/json'
    this.loadStorage();
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
    this.usuario = null;
    this.token = null;
    this.id = null;

    this._storage.remove('token');
    this._storage.remove('usuario');
    this._storage.remove('id');
    this._router.navigate(['/auth']);

  }

  public setSession(response: ILogin): Promise<boolean> {
    const p = new Promise<boolean>((resolve, reject) => {
      try {
        this._storage.save('id', response.id);
        this._storage.save('token', response.token);
        this._storage.save('usuario', JSON.stringify(response.usuario));
        this.usuario = response.usuario;
        this.token = response.token;
        resolve(true);
      } catch (error) {
        console.log('Error => ', error);
        reject({
          type: 'error',
          message: 'Error creando la session del usuario',
        });
      }
      
    });
    return p;
  }

  public remember(response: ILogin, remember:boolean = false): Promise<boolean> {
    const p = new Promise<boolean>((resolve, reject) => {
      try {
        if (remember){
          this._storage.save('email', response.usuario.email);
          resolve(true);
        }else{
         this._storage.remove('email');
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

  public isRemember(): Promise<{ok: boolean, email: string}> {
    const p = new Promise<{ok: boolean, email: string}>((resolve, reject) => {
      try {
           this._storage.get('email').then(
             (email) => {
               if (email){
                resolve({ok: true, email: email });
               }else{
                resolve({ok: false, email: email });
               }
             }
           ).catch((e) => {
             reject({
               type: 'error',
               message: 'Error al recuperar el email'
             });
           })
   


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


  public loadStorage(): void {
    this._storage.get('token').then(
      (token) => {
        console.log('token', token);
        this.token = token;
        this._storage.get('usuario').then(
          (usuario) => {
            if(usuario){
              this.usuario = JSON.parse(usuario);
            }
          }
        )
      }
    )
  }


  public isLogin(): Promise<boolean> {

    return  new Promise((resolve, reject) => {
      this._storage.get('token').then(
        (toke) => {

          if(!isNull(toke)){
            resolve(true);
          }else{
            resolve(false);
          }
        }, error => {
          resolve(false);
        }
      )
    });
  }



 







}
