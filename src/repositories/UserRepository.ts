import User from '../models/User';

export default class UserRepository {
    private users: Array<User>;

    constructor() {
        this.users = [];
    }

    public findAll(): Array<User> {
        return this.users;
    }
    public findById(id: string): User | undefined {
        return this.users.find(v => v.id === id)
    }
    public findByCpf(cpf: string): User | undefined{
        return this.users.find(v => v.cpf === cpf)
    }
    public save({
        name,
        cpf,
    }: User): User {
        const user = new User({
            name,
            cpf
        });
        this.users.push(user)
        return user;
    }
    public update({ id, name, cpf }: User): User | undefined {
        const user = this.findById(id)
        if (!user) {
            throw Error('Usuário não encontrado')
        }
        user.cpf = cpf;
        user.name = name;
        return user;
    }

    public delete(cpf: string): User | undefined {
        const user = this.findByCpf(cpf)
        console.log('foundUser :>> ', user);
        if (!user) {
            throw Error('Usuário não encontrado')
        }
        const index = this.users.findIndex((v) => v.cpf == cpf)
        this.users.splice(index, 1)
        return user
    }
}