import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './models/User'; // Certifique-se de que o caminho está correto
import sequelize from './db'; // Certifique-se de que o caminho está correto
import cors from 'cors';
// Configuração do dotenv para variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3003;
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'secreta123';

// Middleware para parsing de JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8083', // Substitua pelo seu frontend ou use '*' para permitir todas as origens (não recomendado para produção)
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

// Conectar ao banco de dados
(async () => {
  try {
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log('Banco de dados sincronizado com sucesso');
  } catch (err) {
    console.error('Erro ao sincronizar o banco de dados:', err);
  }
})();

// **Rotas para Autenticação de Usuários**

app.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, birthdate, gender } = req.body;

  if (!name || !email || !password || !birthdate || !gender) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criação do usuário
    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      birthdate,
      gender
    });
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Compara a senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Senha incorreta' });

    // Gera um token JWT
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no login' });
  }
});

// Middleware para proteger rotas com JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    // Adiciona a propriedade 'user' ao req
    req.user = user as JwtPayload;
    next();
  });
};

// Exemplo de rota protegida
app.get('/profile', authenticateToken, (req: Request, res: Response) => {
  res.json({ message: 'Você acessou uma rota protegida!', user: req.user });
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
