import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/shared/alert.service';
import { Usuario } from '../../models/usuario.model';
import { ErrorUtil } from '../../models/http-model';
import { ILogin } from '../../interfaces/login.reponse.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private _userService: UserService,
    private _alertService: AlertService,
    private _router: Router) { }

  ngOnInit() {
    this.form = this.buildForm(this.formBuilder);
    this._userService.isRemember().then(
      (data) => {
        if (data.ok) {
          this.form.get('correo').patchValue(data.email);
          this.form.get('remember').patchValue(data.ok);
        }
      }
    ).catch((e) => {
      this._alertService.open({
        title: e.type,
        text: e.message,
        type: e.type
      });
    })
  }

  private buildForm(formBuilder: FormBuilder): FormGroup {
    return  formBuilder.group({
      correo: [null,  [Validators.required, Validators.email]],
      password: [null,  [Validators.required]],
      remember: [false,  []],
    });
  }

  public onSubmit(): void {
    console.log('forma', this.form);
    if(!this.form.validate()){ return;}

    let usuario = new Usuario(this.form.get('correo').value, this.form.get('password').value);
    this._userService.login(usuario, {
      success: (response: ILogin) => {
        if(response.ok){
          this._userService.setSession(response).then(
            (isTrue) => {
              if(isTrue){
                this._userService.remember(response, this.form.get('remember').value).then(
                  (isSave) => {
                    this._router.navigate(['/dashboard']);
                  }
                )
              }
            }
          ).catch((e) => {
            if(e){
              this._alertService.open({
                title: e.type,
                text: e.message,
                type: e.type
              });
            }
          });
        }
      },
      error: (e: any, util: ErrorUtil) => {       
        if(e){
          this._alertService.open({
            title: e.type,
            text: e.message,
            type: e.type
          });
        }

        
      },
      errorMsgType: 2
    });

  }

}
