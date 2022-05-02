import dotenv from 'dotenv';

dotenv.config();

export const SMTP_CONFIG = {
    host: 'smtp.gmail.com',
    port: 587,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
}
