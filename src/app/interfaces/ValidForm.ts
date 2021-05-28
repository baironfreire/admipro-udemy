import { FormGroup, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { isObject } from 'util';

export abstract class  ValidForm{

 


  static numeric(c: FormControl): ValidationErrors {
    const params = {
      numeric: {}
    };
    return c.value === '' || c.value == null || (!isNaN(parseFloat(c.value)) && isFinite(c.value)) ? null : params;
  }

  static string(c: FormControl): ValidationErrors {
    const params = {
      string: {}
    };
    return c.value === '' || c.value == null ||
      /^[A-Za-z\s]+$/.test(c.value)
      ? null
      : params;
  }
  static stringAccent(c: FormControl): ValidationErrors {
    const params = {
      string: {}
    };
    return c.value === '' || c.value == null ||
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(c.value)
      ? null
      : params;
  }

  static emptyNumeric(c: FormControl): ValidationErrors {
    const params = {
      numeric: {}
    };

    if (c.value === '' || c.value === null) {
      return null;
    } else {
      return !isNaN(parseFloat(c.value)) && isFinite(c.value) ? null : params;
    }
  }

  static email(c: FormControl): ValidationErrors {
    const params = {
      email: {}
    };
    return !c.value ||
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        c.value
      )
      ? null
      : params;
  }

  static username(value: number): ValidatorFn {
    return (c: FormControl): ValidationErrors => {
      const params = {
        username: {}
      };

      return c.value === '' || c.value == null || (c.value.length >= value && /\d/.test(c.value)) ? null : params;
    };
  }

  static password(c: FormControl): ValidationErrors {

      const params = {
        password: {}
      };
      return c.value === '' || c.value == null || (c.value.length >= 1  && /^[A-Za-z0-9_]+$/.test(c.value)) ? null : params;
  }

  static equalField(field: string): ValidatorFn {
    return (c: FormControl): ValidationErrors => {
      const sub = c.parent.controls[field].statusChanges.subscribe(val => {
        c.updateValueAndValidity();
        sub.unsubscribe();
      });

      const value = c.parent.controls[field].value;
      const params = {
        equalField: {
          equal: value
        }
      };

      return c.value === value ? null : params;
    };
  }

  static confirmPassword(field_name: string): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      let password = control.value;
      let isvalid = control.root.value[field_name] == password
      if (!isvalid) {
        return { mismatchePasswords: true }
      } else {
        return null;
      }
    }
  }


  static generic(c: FormControl, regExp: RegExp): ValidationErrors {
    const params = {
      generic: {}
    };
    return !c.value || regExp.test(c.value) ? null : params;
  }

  static creditExpireDate(c: FormControl): ValidationErrors {
    const params = {
      expire: {}
    };
    return !c.value || /^(\d{4})(\/)(0[1-9]|1[0-2])$/.test(c.value) ? null : params;
  }

  static limit(c: FormControl): ValidationErrors {
    const params = {
      specialty: {}
    };
    return !c.value || c.value.length <= 5 ? null : params;
  }

  static ptDate(c: FormControl): ValidationErrors {
    const ptDatePattern =  /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    const date = (isObject(c.value)) ? ValidForm.getStringFromDate(c.value._i) : c.value;
    const params = {
      ngbDate: {
        invalid: date
      }
    };
    return (ptDatePattern.test(date)) ? null : params;
  }
  static getStringFromDate(d: any) {
    return  `${ValidForm.zfill(d.date, 2)}/${ValidForm.zfill((d.month + 1), 2)}/${d.year}`;
  }

  static spaceBeginString(c: FormControl): ValidationErrors {
    const params = {
      spacebegin: {string: c.value}
    };
    return !c.value ||
      !/^\s/.test(c.value)
      ? null
      : params;
  }



  static adult(c: FormControl): ValidationErrors {
    const params = {
      adult: {
        year:  null
      }
    };
    let age = 0;
    if(c.value){

      const birthday_arr =  c.value._i;
      const birthday_date = new Date(birthday_arr.year, birthday_arr.month, birthday_arr.date);
      const ageDifMs = Date.now() - birthday_date.getTime();
      const ageDate = new Date(ageDifMs);
      age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return !c.value || age >= 18 ? null : params;
  }

  static zfill(number, width) {
    const numberOutput = Math.abs(number); /* Valor absoluto del número */
    const length = number.toString().length; /* Largo del número */ 
    const zero = '0'; /* String de cero */
    if (width <= length) {
        if (number < 0) {
             return ('-' + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ('-' + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
  }

  static characterBegin(c: FormControl): ValidationErrors {
    const params = {
      character: {character: c.value}
    };
    let primerPalabra = '';
    if(c.value){
      primerPalabra = c.value.split(' ')[0];
    }    
    return primerPalabra === '' || primerPalabra == null ||
      /^[a-zA-Z]*$/.test(primerPalabra)
      ? null
      : params;
  }

  static limit6(c: FormControl): ValidationErrors {
    const params = {
      specialty6: {}
    };
    return !c.value || c.value.length <= 6 ? null : params;
  }

  static characterSpecialty(c: FormControl): ValidationErrors {
    const params = {
      characterSpecialty: {character: c.value}
    };
    let primerPalabra = '';
    if(c.value){
      primerPalabra = c.value.split(' ')[0];
    }    
    return primerPalabra === '' || primerPalabra == null ||
      /^[a-zA-Z0-9]*$/.test(primerPalabra)
      ? null
      : params;
  }

  static characterSpecialtyGuion(c: FormControl): ValidationErrors {
    const params = {
      characterSpecialtyGuion: {character: c.value}
    };
    let primerPalabra = '';
    if(c.value){
      primerPalabra = c.value.split(' ')[0];
    }    
    return primerPalabra === '' || primerPalabra == null ||
      /^[a-zA-Z0-9--]*$/.test(primerPalabra)
      ? null
      : params;
  }

  static validEndTime(startTime: string): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      const params = { validTime: {} };
      function obtenerMinutos(hora: any): number {
        if (hora !== null && typeof hora !== 'undefined') {
          var spl = hora.split(":");
          return parseInt(spl[0]) * 60 + parseInt(spl[1]);
        }
      }
      let horaIni = obtenerMinutos(control.root.value[startTime]);
      let horaFin = obtenerMinutos(control.value);
      return (horaIni < horaFin) ? null : params
    }
  }

  static equalString(field: string): ValidatorFn {
    return (c: FormControl): ValidationErrors => {
      let data: string = '';
      if(typeof c.value === 'string') {
        data = c.value;
      }
      const value = c.value;
      const params = {
        equalString: {
          equal: field
        }
      };

      return c.value === field ? null : params;
    };
  }
}