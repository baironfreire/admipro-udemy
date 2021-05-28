import { Injectable } from '@angular/core';
import swal from 'sweetalert2'
import { AlertInterface } from '../../interfaces/alert-interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public open(setting: AlertInterface) {
    swal({
      title: setting.title,
      html: setting.text || 'You clicked the button!',
      type: setting.type || 'success',
      timer: setting.timer
    }).catch(swal.noop);
  }

  public timer(setting: AlertInterface){
    swal({
      title: setting.title || 'Espere un momento..!',
      html: setting.text || '',
      type: setting.type || 'success',
      timer: setting.timer,
      onBeforeOpen: () => {
        swal.showLoading();
      },
    }).then((result) => {
      if(result.dismiss  === swal.DismissReason.timer){
        console.log('I was closed by the timer')
      }
    });
  }

  public comfirm(setting: AlertInterface) {
    swal({
      title: setting.title,
      html: setting.text,
      type: setting.type,
      showCancelButton: setting.showCancelButton,
      confirmButtonColor: setting.confirmButtonColor,
      cancelButtonColor: setting.confirmButtonColor,
      confirmButtonText: setting.confirmButtonText,
      cancelButtonText: setting.cancelButtonText,
      allowOutsideClick: setting.allowOutsideClick,
      allowEscapeKey: setting.allowEscapeKey
  }).then((result) => {
      if (result.value) {
        setting.handlerConfirm();
      } else {
          if (setting.handlerCancel) {
            setting.handlerCancel();
          }
      }
  });
  }
}
