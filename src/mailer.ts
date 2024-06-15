import nodemailer from 'nodemailer';
import ejs from 'ejs';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendWelcomeEmail = async (to: string, username: string) => {
  // Define the HTML template as a string
  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome</title>
  </head>
  <body>
      <h1>Welcome, <%= username %>!</h1>
      <p>Thank you for registering at our service.</p>
  </body>
  </html>
  `;

  // Render the template with the provided username
  const html = ejs.render(template, { username });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to Our Service',
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
