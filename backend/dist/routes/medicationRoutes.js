"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicationController_1 = require("../controllers/medicationController");
const router = (0, express_1.Router)();
router.post('/medicamentos', medicationController_1.addMedication);
router.get('/medicamentos', medicationController_1.getAllMedications);
router.get('/medicamentos/:id', medicationController_1.getMedicationById);
exports.default = router;
