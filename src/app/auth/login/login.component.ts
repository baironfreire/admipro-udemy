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
 
        if (this._userService.isRemember()) {
          this.form.get('correo').patchValue(this._userService._email);
          this.form.get('remember').patchValue(this._userService.isRemember());
        }
   
  }

  private buildForm(formBuilder: FormBuilder): FormGroup {
    return  formBuilder.group({
      correo: [null,  [Validators.required, Validators.email]],
      password: [null,  [Validators.required]],
      remember: [false,  []],
    });
  }

  public onSubmit(): void {
  
    if(!this.form.validate()){ return;}

    let usuario = new Usuario(null, this.form.get('correo').value, this.form.get('password').value);
    this._userService.login(usuario, {
      success: (response: ILogin) => {
        if(response.ok){
          this._userService.saveSession(response).then(
            (isTrue: boolean) => {
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
              console.log('Error => ', e);
              this._alertService.open({
                title: e.type,
                text: e.message,
                type: e.type
              });
            }
          });
        }
      },
      error: (e: any) => {       
        if(e){
          console.log('Error => ', e.errors);
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
