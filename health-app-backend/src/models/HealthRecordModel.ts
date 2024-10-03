import connection from '../config/dt';

export const createHealthRecord = (recordData: { userId: number; type: string; value: string }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO HealthRecords (user_id, type, value, recorded_at, created_at) VALUES (?, ?, ?, NOW(), NOW())';
        connection.query(query, [recordData.userId, recordData.type, recordData.value], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const findHealthRecordsByUserId = (userId: number) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM HealthRecords WHERE user_id = ? ORDER BY recorded_at DESC';
        connection.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
