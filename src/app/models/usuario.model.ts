export class Usuario {
    constructor(
        public email: string,
        public password: string,
        public nombre?: string,
        public img?: string,
        public role?: string,
        public _id?: string
    ) {}
}
