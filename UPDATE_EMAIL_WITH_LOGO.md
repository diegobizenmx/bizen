# 🖼️ How to Add Your Logo to Email Templates

## Step 1: Upload Your Logo to Your Website

I've updated the email template to use your logo at:
```
https://bizen.mx/bizen-mondragonlogo.png
```

Make sure this image is accessible at that URL.

---

## Step 2: Update Supabase Email Template

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg

2. **Navigate to:**
   - **Authentication** → **Email Templates**
   - Click **"Confirm signup"**

3. **Copy and paste this entire template:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm your BIZEN account</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Montserrat', Arial, sans-serif; background-color: #f0f7ff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(15, 98, 254, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <!-- Logo -->
              <div style="margin-bottom: 20px;">
                <img 
                  src="https://bizen.mx/bizen-mondragonlogo.png" 
                  alt="BIZEN" 
                  style="width: 80px; height: 80px; display: block; margin: 0 auto;"
                />
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
                ¡Bienvenido a BIZEN! 👋
              </h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4A5568;">
                Gracias por registrarte. Para completar tu cuenta, haz clic en el botón de abajo para confirmar tu email.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0F62FE 0%, #4A90E2 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: 0.3px;">
                Confirmar mi cuenta
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #718096;">
                Si no solicitaste esta cuenta, puedes ignorar este email.
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

4. **Click "Save"**

---

## Alternative: Use a Different Logo

If you want to use a different logo:

1. **Upload your logo** to your website (e.g., `https://bizen.mx/your-logo.png`)
2. **Replace the image URL** in the template:

Change this line:
```html
<img 
  src="https://bizen.mx/bizen-mondragonlogo.png" 
  ...
/>
```

To:
```html
<img 
  src="https://bizen.mx/your-logo.png" 
  ...
/>
```

3. **Update the size** if needed:
   - Currently: `width: 80px; height: 80px;`
   - Adjust to your logo proportions

---

## Pro Tip: Use Absolute URLs

**Important:** Emails must use **absolute URLs** (with `https://`), not relative paths.

✅ Good: `https://bizen.mx/bizen-mondragonlogo.png`  
❌ Bad: `/bizen-mondragonlogo.png` or `./logo.png`

---

## Test the Email

1. Sign up with a new email
2. Check the email (spam folder!)
3. You should see your logo above "BIZEN" ✅

