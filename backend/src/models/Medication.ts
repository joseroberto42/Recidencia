import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Medication extends Model {
  public id!: number;
  public name!: string;
  public dosage!: string;
  public frequency!: string;
  public schedule!: string;
}

Medication.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Medication',
  tableName: 'medications',
  timestamps: false,
});

export default Medication;

