"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMedication = void 0;
const validateMedication = (req, res, next) => {
    const { userId, name, dosage, frequency, schedule } = req.body;
    if (!userId || !name || !dosage || !frequency || !schedule) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    next();
};
exports.validateMedication = validateMedication;
