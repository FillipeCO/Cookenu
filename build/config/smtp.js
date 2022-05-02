"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SMTP_CONFIG = {
    host: 'smtp.gmail.com',
    port: 587,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
};
//# sourceMappingURL=smtp.js.map