"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHealthRecord = void 0;
const validateHealthRecord = (req, res, next) => {
    const { userId, type, value } = req.body;
    if (!userId || !type || !value) {
        return res.status(400).json({ message: 'Dados incompletos. Verifique userId, type e value.' });
    }
    next();
};
exports.validateHealthRecord = validateHealthRecord;
