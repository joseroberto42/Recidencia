import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from './models/User';
import Medication from './models/Medication';
import HealthRecord from './models/HealthRecord';
dotenv.config();

const sequelize = new Sequelize('saude', 'root', 'nova_senha', {
  host: 'localhost',
  dialect: 'mysql',
});
console.log('Sequelize instance:', sequelize);  // Verifique se a 
// Definir relacionamentos
User.hasMany(Medication, { foreignKey: 'userId' });
Medication.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(HealthRecord, { foreignKey: 'userId' });
HealthRecord.belongsTo(User, { foreignKey: 'userId' });
export default sequelize;
