import express from 'express';
import { createHealthRecord, findHealthRecordsByUserId } from '../models/HealthRecordModel';

import { validateHealthRecord } from '../middleware/healthRecordMiddleware';
import { addHealthRecord, getHealthRecords } from '../controllers/HealthRecordController';
import { authMiddleware } from '../middleware/authMiddleware';


const router = express.Router();

router.post('/', authMiddleware, validateHealthRecord, addHealthRecord);
router.get('/:userId', authMiddleware, getHealthRecords);
// Criar registro de saúde
router.post('/', authMiddleware, validateHealthRecord, async (req, res) => {
    const { userId, type, value } = req.body;
    try {
        await createHealthRecord({ userId, type, value });
        res.status(201).json({ message: 'Registro de saúde criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar registro de saúde.', error });
    }
});

// Buscar registros de saúde por usuário
router.get('/:userId', authMiddleware, async (req, res) => {
    const userId = Number(req.params.userId);
    try {
        const records = await findHealthRecordsByUserId(userId);
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar registros de saúde.', error });
    }
});

export default router;
