// src/routes/MedicationRoutes.ts
import express from 'express';
import {
    createMedicationHandler,
    getMedicationsHandler,
    updateMedicationHandler,
    deleteMedicationHandler
} from '../controllers/MedicationController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateMedication } from '../middleware/medicationMiddleware';

const router = express.Router();

// Criar medicamento
router.post('/', authMiddleware, validateMedication, createMedicationHandler);

// Obter medicamentos por usuário
router.get('/:userId', authMiddleware, getMedicationsHandler);

// Atualizar medicamento
router.put('/:id', authMiddleware, validateMedication, updateMedicationHandler);

// Excluir medicamento
router.delete('/:id', authMiddleware, deleteMedicationHandler);

export default router;
