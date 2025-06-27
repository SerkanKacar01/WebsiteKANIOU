import axios from "axios";

export async function sendMailgunEmail(to: string, subject: string, text: string) {
  const DOMAIN = process.env.MAILGUN_DOMAIN || "kaniou.be";
  const API_KEY = process.env.MAILGUN_API_KEY;

  if (!API_KEY) {
    throw new Error("MAILGUN_API_KEY environment variable is required");
  }

  console.log(`Sending email to ${to} using domain ${DOMAIN}`);

  try {
    const response = await axios.post(
      `https://api.eu.mailgun.net/v3/${DOMAIN}/messages`,
      new URLSearchParams({
        from: `KANIOU Zilvernaald <noreply@${DOMAIN}>`,
        to: to,
        subject: subject,
        text: text,
      }),
      {
        auth: {
          username: "api",
          password: API_KEY,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(`Email sent successfully to ${to}:`, response.data);
    return response.data;
  } catch (error: any) {
    console.error("Mailgun error:", error.response?.data || error.message);
    throw new Error(`Failed to send email: ${error.response?.data?.message || error.message}`);
  }
}