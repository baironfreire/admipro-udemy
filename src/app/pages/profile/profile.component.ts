import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Usuario } from '../../models/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserResponse } from '../../interfaces/user-response.interface';
import { AlertService } from '../../services/shared/alert.service';
import { UploadFileService } from '../../services/shared/upload-file.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  public user: Usuario;
  public form: FormGroup;
  public porcentaje1: number;
  public imgUpload: File;
  public imgTemp: any;

  constructor(private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService) { 
    }

  ngOnInit() {
    this.user = this._userService._user;
    this.form = this.buildForm(this._formBuilder, this.user);

  }

  private buildForm(formBuilder: FormBuilder, user: Usuario): FormGroup {
    return formBuilder.group({
      username: [user.nombre || null, [Validators.required]],
      email: [user.email || null, [Validators.required, Validators.email]],
    });
  }

  public onSubmit(): void {
    if(!this.form.validate()) { return; }

    this.user.nombre = this.form.get('username').value;
    this.user.email = this.form.get('email').value;

    this._userService.update(this.user, {
      success: (response: UserResponse ) => {
        console.log('response', response);
        if(response.ok){
          if(response.usuario) {
            this._alertService.open({
              title: response.type,
              text: `${response.message} ${response.usuario.nombre}`,
              type: response.type
            });
          }
          response.token = this._userService._token;
          this._userService.saveSession(response).then((isCreated) => isCreated).catch(
            (e) => {
              if(e) {
                console.log('Error => ', e);
                this._alertService.open({
                  title: e.type,
                  text: e.message,
                  type: e.type
                });
              }
            }
          )
        }
      },
      error: (e) => {
        console.log('Error token => ', e);
        if(e) {
          console.log('Error => ', e);
          this._alertService.open({
            title: e.type,
            text: e.message,
            type: e.type
          });
        }
      }
    })

  }

  public imageSelected(file: File): void {
    if(!file){
      this.imgUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0){
      this._alertService.open({
        title:"error",
        text: "El archivo no es una imagen",
        type: "success"
      });
      this.imgUpload = null;
      return;
    }
    this.imgUpload = file;

    let reader = new FileReader();
    let urlImgTemp =   reader.readAsDataURL(file)

    reader.onloadend = () =>  this.imgTemp = reader.result;
  }

  public imagenChange(){
    this._userService.imagenChange(this.imgUpload, this.user._id)
  }

}
