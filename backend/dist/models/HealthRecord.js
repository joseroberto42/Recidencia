"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db")); // Ajuste o caminho conforme necessário
const User_1 = __importDefault(require("./User"));
class HealthRecord extends sequelize_1.Model {
}
// Inicializar o modelo HealthRecord
HealthRecord.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.default,
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE', // Excluir registros de saúde quando o usuário for excluído
    },
    type: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    value: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    recordedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: 'health_records',
    timestamps: true, // O Sequelize gerenciará createdAt e updatedAt automaticamente
});
// Definir relacionamento entre HealthRecord e User
User_1.default.hasMany(HealthRecord, { foreignKey: 'userId', as: 'healthRecords' });
HealthRecord.belongsTo(User_1.default, { foreignKey: 'userId', as: 'user' });
exports.default = HealthRecord;
