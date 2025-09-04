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
      <body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; background-color:#f5f7fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; box-shadow:0 4px 24px rgba(16,182,141,0.10), 0 1.5px 6px rgba(16,182,141,0.08); overflow:hidden;">
                <tr>
                  <td style="background: linear-gradient(90deg, #10b68d 0%, #4A90E2 100%); padding: 32px 0 16px 0; text-align:center;">
                    <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="MSJmarket" width="64" height="64" style="margin-bottom:12px;" />
                    <h2 style="color:#fff; margin:0; font-size:2rem; font-weight:700;">Recuperación de Contraseña</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 32px 16px 32px; text-align:center;">
                    <p style="font-size:18px; color:#333; margin-bottom:18px;">
                      Hola, hemos recibido una solicitud para restablecer tu contraseña.
                    </p>
                    <p style="font-size:16px; color:#555; margin-bottom:28px;">
                      Haz clic en el botón a continuación para crear una nueva contraseña:
                    </p>
                    <a href="${recoveryUrl}" style="display:inline-block; margin:20px 0; padding:14px 36px; background:linear-gradient(90deg,#10b68d 0%,#4A90E2 100%); color:#fff; text-decoration:none; border-radius:6px; font-size:18px; font-weight:600; letter-spacing:0.5px; box-shadow:0 2px 8px rgba(16,182,141,0.10); transition:background 0.2s;">
                      Recuperar contraseña
                    </a>
                    <p style="font-size:15px; color:#888; margin:32px 0 0 0;">
                      O copia y pega este enlace en tu navegador:<br />
                      <a href="${recoveryUrl}" style="color:#4A90E2; word-break:break-all;">${recoveryUrl}</a>
                    </p>
                    <hr style="margin:32px 0 18px 0; border:0; border-top:1px solid #eee;">
                    <p style="font-size:13px; color:#aaa; margin:0;">
                      Este enlace expirará en 15 minutos por seguridad.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center; padding:18px; background-color:#f0f0f0; font-size:13px; color:#999; border-radius:0 0 12px 12px;">
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
