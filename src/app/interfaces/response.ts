export interface IResponse {
    ok: boolean;
    type: string;
    message: string;
    errors?: any[];
}