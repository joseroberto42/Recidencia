"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Cria uma instância do Axios com a URL base do backend
const api = axios_1.default.create({
    baseURL: 'http://localhost:3003', // URL do backend
});
// Interceptor para adicionar o token JWT no cabeçalho Authorization
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Recupera o token JWT do localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
exports.default = api;
