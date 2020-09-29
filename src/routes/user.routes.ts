import { Router } from 'express';
import UserRepository from '../repositories/UserRepository';

const userRouter = Router();
const userRepository = new UserRepository();

userRouter.get('/', (request, response) => {
    response.json(userRepository.findAll());
});

userRouter.post('/', (request, response) => {
    try {
        const {
            name,
            id,
            cpf,
        } = request.body;
        const user = userRepository.save({
            cpf,
            name,
            id
        });
        response.status(201).json(user)
    } catch (err) {
        return response.status(400).json({ Erro: err.message })
    }
});

userRouter.put('/:id', (request, response) => {
    try {
        const { id } = request.params;
        const { name, cpf } = request.body;
        const updateUser = userRepository.update({
            id,
            name,
            cpf
        })
        return response.status(200).json(updateUser);
    } catch (err) {
        return response.status(400).json({ Erro: err.message })
    }
})

userRouter.delete('/:cpf', (request, response) => {
    try {
        const { cpf } = request.params;
        console.log('cpf :>> ', cpf);
        return response.status(204).json(userRepository.delete(cpf));
    } catch (err) {
        return response.status(400).json({ Erro: err.message })
    }
});

export default userRouter;