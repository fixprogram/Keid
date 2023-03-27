import nodemailer from "nodemailer";

class MailServiceClass {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
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
