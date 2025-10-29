# 📧 All BIZEN Email Templates

Copy and paste these into Supabase → Authentication → Email Templates

---

## 1️⃣ Confirm Signup

✅ Copy from `bizen-email-template.html` (already fixed to reduce spam warnings)

---

## 2️⃣ Magic Link (Login)

**Location:** Supabase → Email Templates → "Magic Link"

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIZEN Login</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Montserrat', Arial, sans-serif; background-color: #f0f7ff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(15, 98, 254, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <img src="https://bizen.mx/bsmx-logo.png" alt="BIZEN" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
              </div>
              <h1 style="margin: 0; font-size: 42px; font-weight: 900; color: #0F62FE; letter-spacing: 0.05em;">
                BIZEN
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #1a202c;">
                Inicia sesión en BIZEN 🔐
              </h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4A5568;">
                Haz clic en el botón de abajo para iniciar sesión en tu cuenta de BIZEN.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0F62FE 0%, #4A90E2 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: 0.3px;">
                Iniciar sesión
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #718096;">
                Si no solicitaste este acceso, puedes ignorar este email de forma segura.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 3️⃣ Reset Password

**Location:** Supabase → Email Templates → "Reset Password"

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restablecer contraseña - BIZEN</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Montserrat', Arial, sans-serif; background-color: #f0f7ff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(15, 98, 254, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <img src="https://bizen.mx/bsmx-logo.png" alt="BIZEN" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
              </div>
              <h1 style="margin: 0; font-size: 42px; font-weight: 900; color: #0F62FE; letter-spacing: 0.05em;">
                BIZEN
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #1a202c;">
                Restablece tu contraseña 🔑
              </h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4A5568;">
                Has solicitado restablecer tu contraseña de BIZEN. Haz clic en el botón de abajo para crear una nueva contraseña.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0F62FE 0%, #4A90E2 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: 0.3px;">
                Restablecer contraseña
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #718096;">
                Este enlace expirará en 1 hora. Si no solicitaste este cambio, puedes ignorar este email de forma segura.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 4️⃣ Change Email Address

**Location:** Supabase → Email Templates → "Change Email Address"

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmar cambio de email - BIZEN</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Montserrat', Arial, sans-serif; background-color: #f0f7ff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(15, 98, 254, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <img src="https://bizen.mx/bsmx-logo.png" alt="BIZEN" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
              </div>
              <h1 style="margin: 0; font-size: 42px; font-weight: 900; color: #0F62FE; letter-spacing: 0.05em;">
                BIZEN
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #1a202c;">
                Confirmar nuevo email ✉️
              </h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4A5568;">
                Has solicitado cambiar tu dirección de email en BIZEN. Haz clic en el botón de abajo para confirmar tu nuevo email.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0F62FE 0%, #4A90E2 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: 0.3px;">
                Confirmar nuevo email
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #718096;">
                Si no solicitaste este cambio, contacta a soporte inmediatamente.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 5️⃣ Invite User

**Location:** Supabase → Email Templates → "Invite User"

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitación a BIZEN</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Montserrat', Arial, sans-serif; background-color: #f0f7ff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(15, 98, 254, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <img src="https://bizen.mx/bsmx-logo.png" alt="BIZEN" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
              </div>
              <h1 style="margin: 0; font-size: 42px; font-weight: 900; color: #0F62FE; letter-spacing: 0.05em;">
                BIZEN
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #1a202c;">
                ¡Has sido invitado a BIZEN! 🎉
              </h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4A5568;">
                Te hemos invitado a unirte a BIZEN, la plataforma de aprendizaje en finanzas.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0F62FE 0%, #4A90E2 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: 0.3px;">
                Aceptar invitación
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #718096;">
                Si no esperabas esta invitación, puedes ignorar este email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 📋 How to Apply

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg
   
2. **Navigate to:**
   - **Authentication** → **Email Templates**

3. **Update each template:**
   - Find the template (e.g., "Reset Password")
   - Click on it
   - **Delete** the old content
   - **Paste** the HTML from above
   - Click **"Save"**

4. **Repeat for all 5 templates**

---

## ✅ Done!

All your emails will now have:
- ✅ BSMX logo at the top
- ✅ BIZEN branding
- ✅ Professional design
- ✅ Same styling across all templates

