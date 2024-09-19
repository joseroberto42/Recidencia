import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'; // Ajuste o caminho conforme necessário
import User from './User';

interface HealthRecordAttributes {
  id: number;
  userId: number;
  type: string;
  value: string;
  recordedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HealthRecordCreationAttributes extends Optional<HealthRecordAttributes, 'id'> {}

class HealthRecord extends Model<HealthRecordAttributes, HealthRecordCreationAttributes> implements HealthRecordAttributes {
  public id!: number;
  public userId!: number;
  public type!: string;
  public value!: string;
  public recordedAt!: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
}

// Inicializar o modelo HealthRecord
HealthRecord.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',  // Excluir registros de saúde quando o usuário for excluído
  },
  type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  recordedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'health_records',
  timestamps: true, // O Sequelize gerenciará createdAt e updatedAt automaticamente
});

// Definir relacionamento entre HealthRecord e User
User.hasMany(HealthRecord, { foreignKey: 'userId', as: 'healthRecords' });
HealthRecord.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default HealthRecord;
