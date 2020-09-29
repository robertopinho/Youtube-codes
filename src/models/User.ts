import { uuid } from 'uuidv4'
export default class User {
    id: string;
    name: string;
    cpf: string;

    constructor({
        name,
        cpf,
    }: Omit<User, 'id'>) {
        this.cpf = cpf;
        this.name = name;
        this.id = uuid()
    }
}