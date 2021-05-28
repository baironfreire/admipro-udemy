import { FormArray, FormControl, FormGroup } from '@angular/forms';

declare module '@angular/forms/src/model' {
  interface FormGroup {
    /**
     * Valida si el formulario es valido y genera todos los subsecuentes errores de validación para cada uno de los subcontroles
     */
    validate(this: FormGroup): boolean;

    /**
     * Asigna mensajes personalizados para las validaciones de los controles
     */
    setCustomErrorMessages(this: FormGroup, messages: any): void;

    /**
     * Retorna los mensajes personalizados asignados al formulario
     */
    getCustomErrorMessages(this: FormGroup): any;

    inputInvalid(this: FormGroup, field: any): String;
  }
}

FormGroup.prototype.inputInvalid = function(this: FormGroup, field: any): String {
  const control = this.controls[field];

  if (control.invalid && control.touched) {
    return 'input-invalid';
  }
  return '';
};

FormGroup.prototype.validate = function(this: FormGroup): boolean {
  Object.keys(this.controls).forEach(field => {
    const control = this.controls[field];

    if (control instanceof FormControl) {
      control.markAsTouched();
      control.updateValueAndValidity();
    } else if (control instanceof FormArray) {
      control.controls.forEach((subform: FormGroup) => subform.validate());
    } else if (control instanceof FormGroup) {
      control.validate();
    }
  });
  return this.valid;
};

FormGroup.prototype.setCustomErrorMessages = function(this: FormGroup, messages: any): void {
  (<any>this)._customErrors = messages;
};

FormGroup.prototype.getCustomErrorMessages = function(this: FormGroup): any {
  return (<any>this)._customErrors;
};
