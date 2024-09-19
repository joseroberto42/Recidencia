import { Router } from 'express';
import { addMedication, getAllMedications, getMedicationById } from '../controllers/medicationController';

const router = Router();

router.post('/medicamentos', addMedication);
router.get('/medicamentos', getAllMedications);
router.get('/medicamentos/:id', getMedicationById);

export default router;
