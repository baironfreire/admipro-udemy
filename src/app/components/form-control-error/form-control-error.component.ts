import { Component, forwardRef, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HelperService } from '../../services/service.index';



@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',  
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlErrorComponent)
    },
    HelperService
  ]
})
export class FormControlErrorComponent implements OnInit, ControlValueAccessor {
  @Input()
  formControlName: string;

  @Input()
  className: string;

  control: AbstractControl;
  formError: string;
  customErrorMessages: any;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private helper: HelperService
  ) {}

  ngOnInit() {
    this.control = this.controlContainer.control.get(this.formControlName);
    this.customErrorMessages = this.helper.getCustomErrorMessages(<FormGroup>this.control.parent);

    this.control.statusChanges.subscribe(status => {
      if (this.control.invalid && this.control.touched) {
        Object.keys(this.control.errors).every(errorName => {
          this.formError = this.getErrorMessage(errorName, this.control.errors[errorName]);
          return false;
        });
      } else this.formError = '';
    });
  }

  private getErrorMessage(errorName: string, error: any) {
    if (this.customErrorMessages && this.customErrorMessages[this.formControlName] && this.customErrorMessages[this.formControlName][errorName]) {
      return this.customErrorMessages[this.formControlName][errorName];
    }

    const messages = {
      required: () => 'Campo requerido',
      minlength: params => `Cantidad mínima de carácteres permitidos: ${params.requiredLength}`,
      maxlength: params => `Cantidad máxima de carácteres permitidos: ${params.requiredLength}`,
      min: params => `El valor mínimo permitido es ${params.min}`,
      max: params => `El valor máximo permitido es ${params.max}`,
      minField: params => `El valor mínimo permitido es ${params.min}`,
      maxField: params => `El valor máximo permitido es ${params.max}`,
      pattern: params => `El patrón requerido es: ${params.requiredPattern}`,
      email: params => `Debe ingresar una cuenta de correo válida`,
      numeric: params => `Solo valores numéricos permitidos`,
      integer: params => `Solo valores enteros permitidos`,
      async: params => `Validación asíncrona fallida`,
      money: params => `Solo valores monetarios permitidos`,
      date: params => `Fecha no válida`,
      equalField: params => `El valor debe ser igual a '${params.equal}'`,
      extension: params => `Seleccione un archivo con una de las siguientes extensión '${params.extens}'`,
      segments: params => `La cadena debe contener ${params.cant} segmentos separados por '${params.delimiter}'`,
      finalPeriod: param => `El periodo final debe ser mayor o igual al periodo inicial`,
      initPeriod: param => `El periodo inicial debe ser menor o igual al periodo final`,
      largerThan: params => `El valor debe ser mayor o igual a '${params.equal}'`,
      notspace: params => `No se permiten espacios en blancos`,
      mismatchePasswords: params => `La contraseña no coinciden`,
    };

    return messages[errorName].call(this, error);
  }

  writeValue(value: any) {}
  registerOnChange(fn) {}
  registerOnTouched(fn) {}
}
