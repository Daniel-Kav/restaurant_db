import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendWelcomeEmail = async (to: string, username: string) => {
  const templatePath = path.resolve(__dirname, 'templates', 'welcome-email.ejs');

  const html = await ejs.renderFile(templatePath, { username });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to Our Service',
    html
  };

  await transporter.sendMail(mailOptions);
};
