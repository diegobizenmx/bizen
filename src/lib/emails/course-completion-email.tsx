// BIZEN Course Completion Email Template

interface CourseCompletionEmailProps {
  name: string;
  moduleName: string;
  completionDate: string;
  dashboardUrl: string;
  nextModuleUrl?: string;
}

export const BizenCourseCompletionEmail = ({ 
  name, 
  moduleName,
  completionDate,
  dashboardUrl,
  nextModuleUrl
}: CourseCompletionEmailProps) => {
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
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .celebration-icon {
            font-size: 64px;
            margin-bottom: 15px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 2px;
            opacity: 0.95;
            margin-top: 10px;
          }
          .content {
            padding: 40px 30px;
            background-color: #ffffff;
          }
          .greeting {
            font-size: 28px;
            color: #047857;
            margin-bottom: 20px;
            font-weight: 700;
            text-align: center;
          }
          .message {
            font-size: 16px;
            color: #444;
            line-height: 1.8;
            margin-bottom: 20px;
          }
          .achievement-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 2px solid #059669;
            padding: 30px;
            margin: 30px 0;
            border-radius: 12px;
            text-align: center;
          }
          .achievement-box h2 {
            color: #047857;
            font-size: 22px;
            margin-bottom: 10px;
          }
          .achievement-box .module-name {
            font-size: 18px;
            color: #059669;
            font-weight: 600;
            margin: 10px 0;
          }
          .achievement-box .date {
            font-size: 14px;
            color: #666;
            margin-top: 10px;
          }
          .stats-container {
            display: table;
            width: 100%;
            margin: 30px 0;
            background-color: #f9fafb;
            border-radius: 8px;
            overflow: hidden;
          }
          .stat-item {
            display: table-cell;
            padding: 20px;
            text-align: center;
            border-right: 1px solid #e5e7eb;
          }
          .stat-item:last-child {
            border-right: none;
          }
          .stat-icon {
            font-size: 32px;
            margin-bottom: 8px;
          }
          .stat-value {
            font-size: 24px;
            font-weight: 700;
            color: #059669;
          }
          .stat-label {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
          }
          .button {
            display: inline-block;
            padding: 16px 32px;
            background-color: #059669;
            color: white !important;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            text-align: center;
            margin: 10px;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
          }
          .button-secondary {
            background-color: #0B71FE;
            box-shadow: 0 4px 12px rgba(11, 113, 254, 0.3);
          }
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          .quote-box {
            border-left: 4px solid #059669;
            padding: 20px;
            margin: 25px 0;
            background-color: #f9fafb;
            font-style: italic;
            color: #666;
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
              font-size: 24px;
            }
            .stats-container {
              display: block;
            }
            .stat-item {
              display: block;
              border-right: none;
              border-bottom: 1px solid #e5e7eb;
            }
            .stat-item:last-child {
              border-bottom: none;
            }
            .button {
              display: block;
              margin: 10px 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <!-- Header -->
          <div class="header">
            <div class="celebration-icon">🎉</div>
            <h1 style="font-size: 32px; margin-bottom: 10px;">¡Felicidades!</h1>
            <div class="logo">BIZEN</div>
          </div>

          <!-- Content -->
          <div class="content">
            <div class="greeting">¡Excelente trabajo, ${name}! 🌟</div>
            
            <p class="message" style="text-align: center; font-size: 18px;">
              Has completado exitosamente tu módulo. ¡Este es un gran logro!
            </p>

            <div class="achievement-box">
              <div style="font-size: 48px; margin-bottom: 15px;">🏆</div>
              <h2>Módulo Completado</h2>
              <div class="module-name">${moduleName}</div>
              <div class="date">Completado el ${completionDate}</div>
            </div>

            <p class="message">
              Tu dedicación y esfuerzo han dado frutos. Cada módulo completado te acerca más a tus objetivos profesionales.
            </p>

            <div class="stats-container">
              <div class="stat-item">
                <div class="stat-icon">✅</div>
                <div class="stat-value">100%</div>
                <div class="stat-label">COMPLETADO</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🎯</div>
                <div class="stat-value">+1</div>
                <div class="stat-label">MÓDULO</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">📈</div>
                <div class="stat-value">↑</div>
                <div class="stat-label">PROGRESO</div>
              </div>
            </div>

            <div class="quote-box">
              "El éxito es la suma de pequeños esfuerzos repetidos día tras día."
              <div style="text-align: right; margin-top: 10px; font-weight: 600;">— Robert Collier</div>
            </div>

            <h3 style="color: #0E4A7A; margin-top: 30px; margin-bottom: 15px; text-align: center;">
              ¿Qué sigue? 🚀
            </h3>

            <div class="button-container">
              <a href="${dashboardUrl}" class="button">
                Ver mi Dashboard 📊
              </a>
              ${nextModuleUrl ? `
              <a href="${nextModuleUrl}" class="button button-secondary">
                Siguiente Módulo →
              </a>
              ` : ''}
            </div>

            <p class="message" style="margin-top: 30px; text-align: center; font-size: 14px; color: #666;">
              Tu progreso se ha guardado automáticamente. Puedes revisar tus logros y estadísticas en cualquier momento desde tu dashboard.
            </p>

            <p style="margin-top: 25px; font-weight: 600; color: #0E4A7A; text-align: center;">
              ¡Sigue así! 💪<br>
              El equipo de BIZEN
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin-bottom: 10px;">
              <a href="${dashboardUrl}" style="color: #059669; text-decoration: none; font-weight: 600;">
                Ver mi progreso
              </a> • 
              <a href="mailto:soport@bizen.site" style="color: #0B71FE; text-decoration: none;">
                Soporte
              </a>
            </p>
            
            <p style="margin-top: 15px; font-size: 13px;">
              © ${new Date().getFullYear()} BIZEN. Todos los derechos reservados.
            </p>
            
            <p style="margin-top: 10px; font-size: 12px; color: #999;">
              Recibiste este email porque completaste un módulo en BIZEN.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Helper function to send course completion email
export const sendCourseCompletionEmail = async (
  to: string,
  name: string,
  moduleName: string,
  completionDate: string,
  dashboardUrl: string,
  nextModuleUrl?: string
) => {
  const { resend } = await import('@/lib/resend');
  
  return await resend.emails.send({
    from: 'BIZEN <cursos@resend.dev>', // Change to your verified domain like: 'BIZEN <cursos@bizen.site>'
    to,
    subject: `🎉 ¡Felicidades! Completaste ${moduleName}`,
    html: BizenCourseCompletionEmail({ 
      name, 
      moduleName, 
      completionDate, 
      dashboardUrl,
      nextModuleUrl 
    }),
  });
};

