import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shobhitgoyalg@gmail.com",
    pass: "yxsftufvjtjtuloa",
  },
});

export const sendEmail = (subject, text, recipient) => {
  const mailingOptions = {
    from: "shobhitgoyalg@gmail.com",
    to: recipient,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailingOptions);
};
