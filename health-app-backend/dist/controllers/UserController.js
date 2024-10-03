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
const Usernodel_1 = require("../models/Usernodel"); // Corrigido para UserModel
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registrar usuário
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, birthdate, gender } = req.body;
    // Validação dos dados
    if (!name || !email || !password || !birthdate || !gender) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const existingUser = yield (0, Usernodel_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já registrado.' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield (0, Usernodel_1.createUser)({ name, email, password: hashedPassword, birthdate, gender });
        // Aqui você pode adicionar o envio de e-mail de confirmação, se desejar
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário.', error });
    }
});
exports.registerUser = registerUser;
// Login de usuário
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, Usernodel_1.findUserByEmail)(email);
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secreta', { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login.', error });
    }
});
exports.loginUser = loginUser;
