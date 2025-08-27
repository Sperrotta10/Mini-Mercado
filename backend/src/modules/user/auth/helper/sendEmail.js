import nodemailer from "nodemailer";
import { enviroment } from "../../../../config/enviroment.js";

export async function sendRecoveryEmail(email, token) {
  const recoveryUrl = `${enviroment.FRONTEND_URL}/reset-password?token=${token}`;
  const currentYear = new Date().getFullYear();

  const transporter = nodemailer.createTransport({
    host: enviroment.SMTP_HOST,
    port: enviroment.SMTP_PORT,
    secure: enviroment.SMTP_SECURE === "true",
    auth: {
      user: enviroment.SMTP_USER,
      pass: enviroment.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Soporte - MiniMercado MSJmarket 🛒" <${enviroment.SMTP_USER}>`,
    to: email,
    subject: "Recupera tu contraseña",
    html: `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Recuperación de contraseña</title>
      </head>
      <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f5f7fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding:30px; text-align:center;">
                    <h2 style="color:#333;">Recuperación de Contraseña</h2>
                    <p style="font-size:16px; color:#555;">
                      Hola, hemos recibido una solicitud para restablecer tu contraseña.
                    </p>
                    <p style="font-size:16px; color:#555;">
                      Haz clic en el botón a continuación para crear una nueva contraseña:
                    </p>
                    <a href="${recoveryUrl}" style="display:inline-block; margin:20px 0; padding:12px 24px; background-color:#4A90E2; color:#fff; text-decoration:none; border-radius:4px; font-size:16px;">
                      Recuperar contraseña
                    </a>
                    <p style="font-size:14px; color:#888;">
                      O copia y pega este enlace en tu navegador:<br />
                      <a href="${recoveryUrl}" style="color:#4A90E2;">${recoveryUrl}</a>
                    </p>
                    <hr style="margin:30px 0; border:0; border-top:1px solid #eee;">
                    <p style="font-size:12px; color:#aaa;">
                      Este enlace expirará en 15 minutos por seguridad.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center; padding:20px; background-color:#f0f0f0; font-size:12px; color:#999;">
                    © ${currentYear} MSJmarket 🛒. Todos los derechos reservados.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo de recuperación enviado a ${email}`);
  } catch (error) {
    console.error("Error enviando correo de recuperación:", error);
    throw new Error("Error al enviar el correo de recuperación");
  }
}
