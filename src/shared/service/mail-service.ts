import nodemailer, { Transporter } from "nodemailer";

class MailServiceClass {
  transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      // host: process.env.EMAIL_SERVER_HOST,
      port: 587,
      // port: process.env.EMAIL_SERVER_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER as string,
        pass: process.env.EMAIL_SERVER_PASSWORD as string,
      },
    });
  }

  async sendActivationMail(to = "", link = "") {
    await this.transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to,
      subject: `Account activation on ${process.env.EMAIL_SERVER_HOST}`,
      text: "",
      html: `
        
            <div>
                <h1>For activation use this link</h1>
                <a href="${link}">${link}</a>
            </div>
                `,
    });
  }
}

export const MailService = new MailServiceClass();
