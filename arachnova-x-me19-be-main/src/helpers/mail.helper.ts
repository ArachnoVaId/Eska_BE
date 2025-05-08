import { Resend } from "resend";
import {
  generateGmbccHtml,
  generateGmbccValidationEmailHTML
} from "../templates/gmbcc-template";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Core reusable email sender
 */
export const sendEmail = async ({
  to,
  subject,
  html
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  if (!to || !subject || !html)
    throw new Error("Missing required email fields");

  const { error } = await resend.emails.send({
    from: "The 19th Management's Events <no-reply@mail.meugm.com>",
    to,
    subject,
    html
  });

  if (error) {
    console.error("Email failed to send:", error);
    throw new Error("Email send failed");
  }
};

export const sendGmbccOnSuccessEmail = async (
  email: string,
  waLink: string,
  competition: string
) => {
  const html = generateGmbccHtml(waLink);
  await sendEmail({
    to: email,
    subject: `Your Registration for ${competition} is Successful!`,
    html
  });
};

interface SendGmbccValidationEmailProps {
  email: string;
  competition: string;
  team: string;
}

export const sendGmbccValidationEmail = async ({
  email,
  competition,
  team
}: SendGmbccValidationEmailProps) => {
  const html = generateGmbccValidationEmailHTML(competition, team);
  await sendEmail({
    to: email,
    subject: `Your Registration for ${competition} is Validated!`,
    html
  });
};
