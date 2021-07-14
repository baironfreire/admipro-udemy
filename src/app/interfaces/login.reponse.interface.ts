import { IResponse } from './response';
import { Usuario } from '../models/usuario.model';

export interface ILogin extends IResponse {
    usuario?: Usuario;
    token?: string;
    id?: string
}