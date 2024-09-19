"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware para proteger rotas com JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Token não fornecido' });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secreta123', (err, user) => {
        if (err)
            return res.status(403).json({ message: 'Token inválido' });
        // Adiciona a propriedade 'user' ao req
        req.user = user;
        next();
    });
};
exports.default = authenticateToken;
