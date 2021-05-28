export interface AlertInterface {
  title?:string;
  text:string;
  type: any; 
  timer?: number;
  showCancelButton?: boolean,
  confirmButtonColor?: string,
  cancelButtonColor?: string,
  confirmButtonText?: string,
  cancelButtonText?: string,
  handlerConfirm?: any,
  handlerCancel?: any,
  allowOutsideClick?:boolean,
  allowEscapeKey?: boolean,
}
