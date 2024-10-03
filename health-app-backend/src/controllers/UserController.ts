import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/Usernodel'; // Corrigido para UserModel
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registrar usuário
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, birthdate, gender } = req.body;

    // Validação dos dados
    if (!name || !email || !password || !birthdate || !gender) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({ name, email, password: hashedPassword, birthdate, gender });

        // Aqui você pode adicionar o envio de e-mail de confirmação, se desejar

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário.', error });
    }
};


// Login de usuário
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secreta', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login.', error });
    }
};
