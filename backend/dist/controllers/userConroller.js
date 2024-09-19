"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User")); // Certifique-se de que o modelo está correto
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registro de usuário
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, birthDate, gender } = req.body;
    // Verificação de campos obrigatórios
    if (!name || !email || !password || !birthDate || !gender) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        // Verifica se o e-mail já está registrado
        const existingUser = yield User_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já registrado' });
        }
        // Criptografar a senha
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Criar o novo usuário
        const newUser = yield User_1.default.create({
            name,
            email,
            password: hashedPassword,
            birthDate,
            gender
        });
        res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});
exports.registerUser = registerUser;
// Login de usuário
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar se o usuário existe
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: 'Usuário não encontrado' });
        // Comparar a senha
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Senha incorreta' });
        // Gerar o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login bem-sucedido', token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no login' });
    }
});
exports.loginUser = loginUser;
