import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import bcrypt from 'bcrypt';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public birthdate!: Date;  // Adicionando data de nascimento
  public gender!: 'male' | 'female' | 'other';  // Adicionando gênero

  // Método de instância para verificar a senha
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,  // Usando DATEONLY para armazenar apenas a data
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),  // Campo de gênero com opções predefinidas
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,  // Agora temos timestamps (createdAt, updatedAt)
});

export default User;
