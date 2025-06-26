import axios from "axios";

export async function sendMailgunEmail(to: string, subject: string, text: string) {
  const DOMAIN = "kaniou.be";
  const API_KEY = process.env.API_KEY;

  const response = await axios.post(
    `https://api.eu.mailgun.net/v3/${DOMAIN}/messages`,
    new URLSearchParams({
      from: "KANIOU Zilvernaald <postmaster@kaniou.be>",
      to: to,
      subject: subject,
      text: text,
    }),
    {
      auth: {
        username: "api",
        password: API_KEY!,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}