import nodemailer from 'nodemailer';

import {SMTP_CONFIG} from '../config/smtp';

const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});


export async function run(email:string, newPassword:string) {
    const mailSent = await transporter.sendMail({
        from: `Team Cookenu <${SMTP_CONFIG.user}>`,
        to: email,
        subject: 'Mudança de senha',
        text: `Sua senha foi alterada com sucesso! Sua nova senha é: ${newPassword}`,
    });

    if (!mailSent) {
        throw new Error('Could not send email');
    }
}