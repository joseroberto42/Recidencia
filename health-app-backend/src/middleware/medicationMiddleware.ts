// src/middleware/medicationMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateMedication = (req: Request, res: Response, next: NextFunction) => {
    const { userId, name, dosage, frequency, schedule } = req.body;

    if (!userId || !name || !dosage || !frequency || !schedule) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    next();
};
