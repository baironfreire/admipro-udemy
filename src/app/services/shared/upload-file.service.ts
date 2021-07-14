import { Injectable } from '@angular/core';
import { String } from 'typescript-string-operations';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';



@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() {}


  public uploadFile(file:File, type:string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('imagen', file, file.name);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response))
          }else{
            console.log('Fallo la subida');
            reject(xhr.response)
          }
        }
      };
 
      let url = String.Format(environment.apiv1.upload, {type: type, id: id});
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });

  }

   



  

  

  

 


}
