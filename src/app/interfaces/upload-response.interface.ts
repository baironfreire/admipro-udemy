import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { ILogin } from './login.reponse.interface';
export interface UploadResponse extends ILogin{
    usuario?: Usuario;
    hospital?: Hospital;

}