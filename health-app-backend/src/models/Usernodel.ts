import connection from '../config/dt';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface User {
    id: number;            // ID do usuário
    name: string;         // Nome do usuário
    email: string;        // E-mail do usuário
    password: string;     // Senha do usuário (hash)
    birthdate: Date;      // Data de nascimento do usuário
    gender: 'Masculino' | 'Feminino' | 'Outro'; // Gênero do usuário
    createdAt: Date;      // Data de criação
    updatedAt: Date;      // Data de atualização
}

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ResultSetHeader> => {
    return new Promise<ResultSetHeader>((resolve, reject) => {
        const query = 'INSERT INTO Users (name, email, password, birthdate, gender, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
        connection.query<ResultSetHeader>(query, [userData.name, userData.email, userData.password, userData.birthdate, userData.gender], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const findUserByEmail = (email: string): Promise<User | null> => {
    return new Promise<User | null>((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE email = ?';
        connection.query<RowDataPacket[]>(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0 ? results[0] as User : null);
        });
    });
};

// Atualize as funções de atualização e exclusão conforme necessário para incluir 'birthdate' e 'gender'.

export const updateUser = (userId: number, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<ResultSetHeader> => {
    return new Promise<ResultSetHeader>((resolve, reject) => {
        const query = 'UPDATE Users SET name = ?, email = ?, birthdate = ?, gender = ?, updatedAt = NOW() WHERE id = ?';
        connection.query<ResultSetHeader>(query, [userData.name, userData.email, userData.birthdate, userData.gender, userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const deleteUser = (userId: number): Promise<ResultSetHeader> => {
    return new Promise<ResultSetHeader>((resolve, reject) => {
        const query = 'DELETE FROM Users WHERE id = ?';
        connection.query<ResultSetHeader>(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
