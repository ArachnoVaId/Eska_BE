export const gmbccWaLink = "https://chat.whatsapp.com/HjXwKXa4v4sKtWdG8tC9kS";

export const generateGmbccHtml = (waLink: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Join Our WhatsApp Group</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 24px; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #25D366;">🎉 Join Our WhatsApp Group!</h2>
    <p>Hi there! 👋</p>
    <p>Thanks for registering! Join our WhatsApp group to stay updated on the latest info and announcements:</p>
    <p style="margin: 24px 0;">
      <a 
        href="${waLink}" 
        style="background-color: #25D366; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;"
        target="_blank"
      >
        👉 Join WhatsApp Group
      </a>
    </p>
    <p>See you there! 🚀</p>
    <hr style="margin: 32px 0;">
    <p style="font-size: 12px; color: #777;">If you didn’t register for this, please ignore this email.</p>
  </div>
</body>
</html>
`;

export const generateGmbccValidationEmailHTML = (
  competitionName: string,
  teamName: string
): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${competitionName} Registration Verified</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 24px; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #25D366;">✅ Registration Verified</h2>
    <p>Hi <strong>${teamName}</strong>! 👋</p>
    <p>We’re excited to let you know that your registration for <strong>${competitionName}</strong> has been successfully verified. 🎉</p>
    <p>To stay informed with the latest announcements, please join our official WhatsApp group:</p>
    <p style="margin: 24px 0;">
      <a 
        href="${gmbccWaLink}" 
        style="background-color: #25D366; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;"
        target="_blank"
      >
        👉 Join WhatsApp Group
      </a>
    </p>
    <p>We look forward to seeing you there! 🚀</p>
    <hr style="margin: 32px 0;">
    <p style="font-size: 12px; color: #777;">If you didn’t register for this competition, please ignore this email.</p>
  </div>
</body>
</html>
`;
