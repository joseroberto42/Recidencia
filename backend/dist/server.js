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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User")); // Certifique-se de que o caminho está correto
const db_1 = __importDefault(require("./db")); // Certifique-se de que o caminho está correto
const cors_1 = __importDefault(require("cors"));
// Configuração do dotenv para variáveis de ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'secreta123';
// Middleware para parsing de JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:8083', // Substitua pelo seu frontend ou use '*' para permitir todas as origens (não recomendado para produção)
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));
// Conectar ao banco de dados
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.sync(); // Sincroniza os modelos com o banco de dados
        console.log('Banco de dados sincronizado com sucesso');
    }
    catch (err) {
        console.error('Erro ao sincronizar o banco de dados:', err);
    }
}))();
// **Rotas para Autenticação de Usuários**
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, birthdate, gender } = req.body;
    if (!name || !email || !password || !birthdate || !gender) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        // Hash da senha
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Criação do usuário
        const newUser = yield User_1.default.create({
            name,
            email,
            password: hashedPassword,
            birthdate,
            gender
        });
        res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verifica se o usuário existe
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: 'Usuário não encontrado' });
        // Compara a senha fornecida com a senha armazenada
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Senha incorreta' });
        // Gera um token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login bem-sucedido', token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no login' });
    }
}));
// Middleware para proteger rotas com JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Token não fornecido' });
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, user) => {
        if (err)
            return res.status(403).json({ message: 'Token inválido' });
        // Adiciona a propriedade 'user' ao req
        req.user = user;
        next();
    });
};
// Exemplo de rota protegida
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Você acessou uma rota protegida!', user: req.user });
});
// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
