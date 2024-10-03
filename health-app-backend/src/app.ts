import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import healthRecordRoutes from './routes/HealthRecordRoutes'
import medicationRoutes from './routes/MedicationRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/medications', medicationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health-records', healthRecordRoutes);
// Inicializando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
