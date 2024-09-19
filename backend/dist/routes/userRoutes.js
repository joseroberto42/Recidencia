"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userConroller_1 = require("../controllers/userConroller");
const router = (0, express_1.Router)();
router.post('/register', userConroller_1.registerUser);
router.post('/login', userConroller_1.loginUser);
exports.default = router;
