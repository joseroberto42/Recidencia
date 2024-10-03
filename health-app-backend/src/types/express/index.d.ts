// src/types/express/index.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number; // Adicione outras propriedades que você precisar
    }
  }
}
