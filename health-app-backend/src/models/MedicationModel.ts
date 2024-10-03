import connection from '../config/dt';

export interface Medication {
    id?: number;
    userId: number; // ID do usuário que possui o medicamento
    name: string; // Nome do medicamento
    dosage: string; // Dosagem do medicamento
    frequency: string; // Frequência de uso (ex: "Uma vez ao dia")
    schedule: string; // Horário de uso (ex: "08:00")
    createdAt?: Date; // Data de criação (opcional)
    updatedAt?: Date; // Data da última atualização (opcional)
}

// Criar um novo medicamento
export const createMedication = (medicationData: Medication) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Medications (userId, name, dosage, frequency, schedule, createdAt) VALUES (?, ?, ?, ?, ?, NOW())';
        connection.query(query, [medicationData.userId, medicationData.name, medicationData.dosage, medicationData.frequency, medicationData.schedule], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Buscar medicamentos por ID de usuário
export const findMedicationsByUserId = (userId: number) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Medications WHERE userId = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Atualizar um medicamento existente
export const updateMedication = (medicationId: number, medicationData: Medication) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Medications SET name = ?, dosage = ?, frequency = ?, schedule = ?, updatedAt = NOW() WHERE id = ?';
        connection.query(query, [medicationData.name, medicationData.dosage, medicationData.frequency, medicationData.schedule, medicationId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Deletar um medicamento
export const deleteMedication = (medicationId: number) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Medications WHERE id = ?';
        connection.query(query, [medicationId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
