// BIZEN Password Reset Email Template

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
}

export const BizenPasswordResetEmail = ({ 
  name, 
  resetUrl 
}: PasswordResetEmailProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
          }
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #0B71FE 0%, #0E4A7A 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 2px;
          }
          .header-subtitle {
            font-size: 14px;
            opacity: 0.95;
          }
          .content {
            padding: 40px 30px;
            background-color: #ffffff;
          }
          .greeting {
            font-size: 24px;
            color: #0E4A7A;
            margin-bottom: 20px;
            font-weight: 600;
          }
          .message {
            font-size: 16px;
            color: #444;
            line-height: 1.8;
            margin-bottom: 20px;
          }
          .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
          }
          .button {
            display: inline-block;
            padding: 16px 32px;
            background-color: #0B71FE;
            color: white !important;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            text-align: center;
            margin: 25px 0;
            box-shadow: 0 4px 12px rgba(11, 113, 254, 0.3);
          }
          .expiry-notice {
            font-size: 14px;
            color: #666;
            text-align: center;
            margin-top: 15px;
          }
          .security-tips {
            background-color: #f0f7ff;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
          }
          .security-tips h3 {
            color: #0E4A7A;
            font-size: 16px;
            margin-bottom: 10px;
          }
          .security-tips ul {
            margin-left: 20px;
            color: #666;
            font-size: 14px;
          }
          .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
          }
          @media only screen and (max-width: 600px) {
            .header {
              padding: 30px 20px;
            }
            .content {
              padding: 30px 20px;
            }
            .greeting {
              font-size: 20px;
            }
            .message {
              font-size: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <!-- Header -->
          <div class="header">
            <div class="logo">BIZEN</div>
            <div class="header-subtitle">Recuperación de contraseña</div>
          </div>

          <!-- Content -->
          <div class="content">
            <div class="greeting">Hola ${name} 👋</div>
            
            <p class="message">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>BIZEN</strong>.
            </p>

            <p class="message">
              Si fuiste tú quien hizo esta solicitud, haz clic en el botón de abajo para crear una nueva contraseña:
            </p>

            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">
                Restablecer contraseña 🔑
              </a>
            </div>

            <p class="expiry-notice">
              ⏰ Este enlace expirará en <strong>1 hora</strong> por seguridad.
            </p>

            <div class="warning-box">
              <strong>⚠️ ¿No solicitaste este cambio?</strong>
              <p style="margin-top: 10px; font-size: 14px; color: #666;">
                Si no solicitaste restablecer tu contraseña, ignora este correo. 
                Tu cuenta permanece segura y no es necesario que hagas nada.
              </p>
            </div>

            <div class="security-tips">
              <h3>🔒 Consejos de seguridad:</h3>
              <ul>
                <li>Usa una contraseña única y fuerte (mínimo 8 caracteres)</li>
                <li>Combina letras mayúsculas, minúsculas, números y símbolos</li>
                <li>No compartas tu contraseña con nadie</li>
                <li>Cambia tu contraseña periódicamente</li>
              </ul>
            </div>

            <p class="message" style="margin-top: 30px; font-size: 14px; color: #666;">
              Si tienes problemas con el botón, copia y pega este enlace en tu navegador:
            </p>
            <p style="font-size: 12px; color: #0B71FE; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px;">
              ${resetUrl}
            </p>

            <p style="margin-top: 25px; font-weight: 600; color: #0E4A7A;">
              El equipo de BIZEN
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin-bottom: 10px;">
              ¿Necesitas ayuda? Escríbenos a 
              <a href="mailto:soporte@bizen.site" style="color: #0B71FE; text-decoration: none;">
                soporte@bizen.site
              </a>
            </p>
            
            <p style="margin-top: 15px; font-size: 13px;">
              © ${new Date().getFullYear()} BIZEN. Todos los derechos reservados.
            </p>
            
            <p style="margin-top: 10px; font-size: 12px; color: #999;">
              Recibiste este email porque solicitaste restablecer tu contraseña en BIZEN.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Helper function to send password reset email
export const sendPasswordResetEmail = async (
  to: string,
  name: string,
  resetUrl: string
) => {
  const { resend } = await import('@/lib/resend');
  
  return await resend.emails.send({
    from: 'BIZEN <seguridad@resend.dev>', // Change to your verified domain like: 'BIZEN <seguridad@bizen.site>'
    to,
    subject: 'Restablece tu contraseña - BIZEN',
    html: BizenPasswordResetEmail({ name, resetUrl }),
  });
};

