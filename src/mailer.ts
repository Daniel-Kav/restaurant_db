import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';


// Load environment variables from .env file
dotenv.config();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use the generated app password here
  }
});

// Function to send welcome email
export const sendWelcomeEmail = async (to: string, username: string) => {
  if (!to) {
    throw new Error('Recipient email address is missing');
  }

  // Define the HTML content directly
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
    </head>
    <body>
        <h1>Welcome, ${username}!</h1>
        <p>Thank you for registering at our service.</p>
    </body>
    </html>
  `;
//default routes

    // try {
    //     let html = await readFile('./index.html', 'utf-8');
    //     return
    // } catch (err:any) {
    //     return
    // }


  // Define mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to Our Service',
    html
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
