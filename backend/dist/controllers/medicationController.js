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
exports.getMedicationById = exports.getAllMedications = exports.addMedication = void 0;
const Medication_1 = __importDefault(require("../models/Medication"));
const User_1 = __importDefault(require("../models/User")); // Se você quiser validar o user_id
// Função para adicionar medicamento
const addMedication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, name, dosage, frequency, schedule } = req.body;
    // Validação dos campos obrigatórios
    if (!user_id || !name || !dosage || !frequency || !schedule) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        // Opcional: verificar se o usuário existe antes de associar o medicamento
        const user = yield User_1.default.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        // Criação do medicamento com a referência ao usuário
        const medication = yield Medication_1.default.create({ user_id, name, dosage, frequency, schedule });
        res.status(201).json(medication);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao adicionar medicamento' });
    }
});
exports.addMedication = addMedication;
// Função para obter todos os medicamentos
const getAllMedications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscar todos os medicamentos e incluir o usuário relacionado
        const medications = yield Medication_1.default.findAll({
            include: [{ model: User_1.default, as: 'user', attributes: ['id', 'name', 'email'] }] // incluir dados do usuário
        });
        res.status(200).json(medications);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao obter medicamentos' });
    }
});
exports.getAllMedications = getAllMedications;
// Função para obter medicamento por ID
const getMedicationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validação do ID
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    try {
        // Buscar medicamento pelo ID, incluindo dados do usuário
        const medication = yield Medication_1.default.findByPk(id, {
            include: [{ model: User_1.default, as: 'user', attributes: ['id', 'name', 'email'] }] // incluir dados do usuário
        });
        if (medication) {
            res.status(200).json(medication);
        }
        else {
            res.status(404).json({ message: 'Medicamento não encontrado' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao obter medicamento' });
    }
});
exports.getMedicationById = getMedicationById;
