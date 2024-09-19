// /middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as JWT_Payload } from 'jsonwebtoken';

// Tipos personalizados
interface JwtPayload extends JWT_Payload {
  id: number;
}

// Middleware para proteger rotas com JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET || 'secreta123', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    // Adiciona a propriedade 'user' ao req
    req.user = user as JwtPayload;
    next();
  });
};

export default authenticateToken;

