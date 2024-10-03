"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHealthRecordsByUserId = exports.createHealthRecord = void 0;
const dt_1 = __importDefault(require("../config/dt"));
const createHealthRecord = (recordData) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO HealthRecords (user_id, type, value, recorded_at, created_at) VALUES (?, ?, ?, NOW(), NOW())';
        dt_1.default.query(query, [recordData.userId, recordData.type, recordData.value], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.createHealthRecord = createHealthRecord;
const findHealthRecordsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM HealthRecords WHERE user_id = ? ORDER BY recorded_at DESC';
        dt_1.default.query(query, [userId], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.findHealthRecordsByUserId = findHealthRecordsByUserId;
