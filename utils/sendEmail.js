import { createTransport } from "nodemailer";

export const sendEmail = async (to, subject, text) => {
    const Transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            }}
    );

    await Transporter.sendMail({
        to,
        subject,
        text,
    });
};