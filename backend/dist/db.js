"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
//import Medication from './models/Medication';
const HealthRecord_1 = __importDefault(require("./models/HealthRecord"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize('saude', 'root', 'nova_senha', {
    host: 'localhost',
    dialect: 'mysql',
});
console.log('Sequelize instance:', sequelize); // Verifique se a 
// Definir relacionamentos
//User.hasMany(Medication, { foreignKey: 'userId' });
//Medication.belongsTo(User, { foreignKey: 'userId' });
User_1.default.hasMany(HealthRecord_1.default, { foreignKey: 'userId' });
HealthRecord_1.default.belongsTo(User_1.default, { foreignKey: 'userId' });
exports.default = sequelize;
