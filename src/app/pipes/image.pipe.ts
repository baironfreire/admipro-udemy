import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { String } from 'typescript-string-operations';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type:string = "usuarios" , args?: any): any {
    console.log('imagen', String.Format(URL_IMAGE.get(type), img));
    return (URL_IMAGE.get(type))? String.Format(URL_IMAGE.get(type), img) :  String.Format(URL_IMAGE.get('default'), img)
  }

}

export const URL_IMAGE = new Map();
URL_IMAGE.set('usuarios',  `${environment.apiv1.img}/usuarios/{0}`);
URL_IMAGE.set('hospital',  `${environment.apiv1.img}/hospital/{0}`);
URL_IMAGE.set('medicos',  `${environment.apiv1.img}/medicos/{0}`);
URL_IMAGE.set('default',  `${environment.apiv1.img}/usuario/{0}`);
