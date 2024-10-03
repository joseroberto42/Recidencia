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
const HealthRecordModel_1 = require("../models/HealthRecordModel");
const healthRecordMiddleware_1 = require("../middleware/healthRecordMiddleware");
const HealthRecordController_1 = require("../controllers/HealthRecordController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authMiddleware, healthRecordMiddleware_1.validateHealthRecord, HealthRecordController_1.addHealthRecord);
router.get('/:userId', authMiddleware_1.authMiddleware, HealthRecordController_1.getHealthRecords);
// Criar registro de saúde
router.post('/', authMiddleware_1.authMiddleware, healthRecordMiddleware_1.validateHealthRecord, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, type, value } = req.body;
    try {
        yield (0, HealthRecordModel_1.createHealthRecord)({ userId, type, value });
        res.status(201).json({ message: 'Registro de saúde criado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar registro de saúde.', error });
    }
}));
// Buscar registros de saúde por usuário
router.get('/:userId', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        const records = yield (0, HealthRecordModel_1.findHealthRecordsByUserId)(userId);
        res.json(records);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar registros de saúde.', error });
    }
}));
exports.default = router;
