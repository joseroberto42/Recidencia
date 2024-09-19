import { Request, Response } from 'express';
import User from '../models/User'; // Certifique-se de que o modelo está correto
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro de usuário
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, birthDate, gender } = req.body;

  // Verificação de campos obrigatórios
  if (!name || !email || !password || !birthDate || !gender) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Verifica se o e-mail já está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já registrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      birthDate, 
      gender 
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

// Login de usuário
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Comparar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Senha incorreta' });

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no login' });
  }
};
