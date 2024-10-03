import { Request, Response } from 'express';
import { createHealthRecord, findHealthRecordsByUserId } from '../models/HealthRecordModel';

// Criar registro de saúde


export const addHealthRecord = async (req: Request, res: Response) => {
    const { userId, type, value } = req.body;
    try {
        await createHealthRecord({ userId, type, value });
        res.status(201).json({ message: 'Registro de saúde criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar registro de saúde.', error });
    }
};

// Buscar registros de saúde por usuário
export const getHealthRecords = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    try {
        const records = await findHealthRecordsByUserId(userId);
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar registros de saúde.', error });
    }
};
