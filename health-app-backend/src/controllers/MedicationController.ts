// sr// src/controllers/MedicationController.ts
import { Request, Response } from 'express';
import { 
    createMedication, 
    findMedicationsByUserId, 
    updateMedication, 
    deleteMedication 
} from '../models/MedicationModel';

export const createMedicationHandler = async (req: Request, res: Response) => {
    const { userId, name, dosage, frequency, schedule } = req.body;
    try {
        await createMedication({ userId, name, dosage, frequency, schedule });
        res.status(201).json({ message: 'Medicamento criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar medicamento.', error });
    }
};

export const getMedicationsHandler = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    try {
        const medications = await findMedicationsByUserId(userId);
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar medicamentos.', error });
    }
};

export const updateMedicationHandler = async (req: Request, res: Response) => {
    const medicationId = Number(req.params.id);
    const { userId, name, dosage, frequency, schedule } = req.body; // Incluindo userId
    try {
        await updateMedication(medicationId, { userId, name, dosage, frequency, schedule });
        res.json({ message: 'Medicamento atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar medicamento.', error });
    }
};

export const deleteMedicationHandler = async (req: Request, res: Response) => {
    const medicationId = Number(req.params.id);
    try {
        await deleteMedication(medicationId);
        res.json({ message: 'Medicamento excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir medicamento.', error });
    }
};
