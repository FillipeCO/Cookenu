"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const smtp_1 = require("../config/smtp");
const transporter = nodemailer_1.default.createTransport({
    host: smtp_1.SMTP_CONFIG.host,
    port: smtp_1.SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: smtp_1.SMTP_CONFIG.user,
        pass: smtp_1.SMTP_CONFIG.pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
function run(email, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailSent = yield transporter.sendMail({
            from: `Team Cookenu <${smtp_1.SMTP_CONFIG.user}>`,
            to: email,
            subject: 'Mudança de senha',
            text: `Sua senha foi alterada com sucesso! Sua nova senha é: ${newPassword}`,
        });
        if (!mailSent) {
            throw new Error('Could not send email');
        }
    });
}
exports.run = run;
//# sourceMappingURL=Mailer.js.map