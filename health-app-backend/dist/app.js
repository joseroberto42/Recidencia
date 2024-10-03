"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const HealthRecordRoutes_1 = __importDefault(require("./routes/HealthRecordRoutes"));
const MedicationRoutes_1 = __importDefault(require("./routes/MedicationRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use('/api/medications', MedicationRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/health-records', HealthRecordRoutes_1.default);
// Inicializando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
