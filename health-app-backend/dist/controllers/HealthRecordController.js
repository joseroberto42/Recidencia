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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthRecords = exports.addHealthRecord = void 0;
const HealthRecordModel_1 = require("../models/HealthRecordModel");
// Criar registro de saúde
const addHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, type, value } = req.body;
    try {
        yield (0, HealthRecordModel_1.createHealthRecord)({ userId, type, value });
        res.status(201).json({ message: 'Registro de saúde criado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar registro de saúde.', error });
    }
});
exports.addHealthRecord = addHealthRecord;
// Buscar registros de saúde por usuário
const getHealthRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        const records = yield (0, HealthRecordModel_1.findHealthRecordsByUserId)(userId);
        res.json(records);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar registros de saúde.', error });
    }
});
exports.getHealthRecords = getHealthRecords;
