import { Request, Response, NextFunction } from 'express';

export const validateHealthRecord = (req: Request, res: Response, next: NextFunction) => {
    const { userId, type, value } = req.body;

    if (!userId || !type || !value) {
        return res.status(400).json({ message: 'Dados incompletos. Verifique userId, type e value.' });
    }

    next();
};
