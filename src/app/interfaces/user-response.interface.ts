
import { Usuario } from '../models/usuario.model';
import { ILogin } from './login.reponse.interface';
export interface UserResponse extends ILogin{
    usuarios?: Usuario[]

}
