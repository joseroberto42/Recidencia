import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreta');
        req.userId = (decoded as { id: number }).id; // Adiciona userId à requisição
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido.' });
    }
};
