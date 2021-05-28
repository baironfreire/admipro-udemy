import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert';
import { UserService, AlertService, HelperService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { ErrorUtil } from '../../models/http-model';
import { ValidForm } from '../../interfaces/ValidForm';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  condiciones: boolean; 

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private helperService: HelperService,
    private router: Router) { }

  ngOnInit() {
    this.condiciones = false;
    this.forma = this.buildForma(this.formBuilder);
  

  }

  private buildForma(formBuilder: FormBuilder): FormGroup {
    return  formBuilder.group({
      nombre: [null, [Validators.required]],
      correo: [null,  [Validators.required, Validators.email]],
      password: ['',  [Validators.required]],
      confirmpassword: ['',  [Validators.required, ValidForm.confirmPassword('password')]],
      condiciones: [false, []],
    });
  }

  public change(): void {
      this.forma.value.condiciones
      console.log('foram',  this.forma.value.condiciones);
  
  }

  public onSubmit(): void {
    
    if(!this.forma.validate()){ return;}

    if(!this.forma.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    let usuario = new Usuario(this.forma.get('correo').value, this.forma.get('password').value, this.forma.get('nombre').value);
    this.userService.registerUser(usuario, {
      success: (response) => {
        console.log('response', response);
        if(response.ok){
          this.router.navigate(['/auth']);
        }
      },
      error: (e: any, util: ErrorUtil) => {       

        if(e){
          this.alertService.open({
            title: e.mensaje,
            text: this.helperService.getErrorsHttpRequest(e.errors.errors),
            type: 'error'
          });
        }

        
      },
      errorMsgType: 2
    });

  }

}
