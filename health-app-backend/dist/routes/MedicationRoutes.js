"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/MedicationRoutes.ts
const express_1 = __importDefault(require("express"));
const MedicationController_1 = require("../controllers/MedicationController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const medicationMiddleware_1 = require("../middleware/medicationMiddleware");
const router = express_1.default.Router();
// Criar medicamento
router.post('/', authMiddleware_1.authMiddleware, medicationMiddleware_1.validateMedication, MedicationController_1.createMedicationHandler);
// Obter medicamentos por usuário
router.get('/:userId', authMiddleware_1.authMiddleware, MedicationController_1.getMedicationsHandler);
// Atualizar medicamento
router.put('/:id', authMiddleware_1.authMiddleware, medicationMiddleware_1.validateMedication, MedicationController_1.updateMedicationHandler);
// Excluir medicamento
router.delete('/:id', authMiddleware_1.authMiddleware, MedicationController_1.deleteMedicationHandler);
exports.default = router;
