import { Request, Response } from 'express';
import Medication from '../models/Medication';
import User from '../models/User'; // Se você quiser validar o user_id

// Função para adicionar medicamento
export const addMedication = async (req: Request, res: Response) => {
  const { user_id, name, dosage, frequency, schedule } = req.body;

  // Validação dos campos obrigatórios
  if (!user_id || !name || !dosage || !frequency || !schedule) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Opcional: verificar se o usuário existe antes de associar o medicamento
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Criação do medicamento com a referência ao usuário
    const medication = await Medication.create({ user_id, name, dosage, frequency, schedule });
    res.status(201).json(medication);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar medicamento' });
  }
};

// Função para obter todos os medicamentos
export const getAllMedications = async (req: Request, res: Response) => {
  try {
    // Buscar todos os medicamentos e incluir o usuário relacionado
    const medications = await Medication.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] // incluir dados do usuário
    });
    res.status(200).json(medications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter medicamentos' });
  }
};

// Função para obter medicamento por ID
export const getMedicationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validação do ID
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Buscar medicamento pelo ID, incluindo dados do usuário
    const medication = await Medication.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] // incluir dados do usuário
    });
    if (medication) {
      res.status(200).json(medication);
    } else {
      res.status(404).json({ message: 'Medicamento não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter medicamento' });
  }
};
