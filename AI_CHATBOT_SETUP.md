# 🤖 AI Chatbot Integration - Environment Setup

## Required Environment Variables

Add this to your `.env.local` file:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

## How to Get Your OpenAI API Key

1. **Visit OpenAI Platform**: Go to [platform.openai.com](https://platform.openai.com)
2. **Sign Up/Login**: Create an account or log in
3. **Navigate to API Keys**: Go to API Keys section in your dashboard
4. **Create New Key**: Click "Create new secret key"
5. **Copy the Key**: Copy the generated API key (starts with `sk-`)
6. **Add to .env.local**: Paste it as the value for `OPENAI_API_KEY`

## Cost Information

- **Model Used**: GPT-3.5-turbo (cost-effective)
- **Pricing**: ~$0.002 per 1K tokens
- **Typical Cost**: $0.01-0.05 per conversation
- **Free Tier**: $5 credit for new accounts

## Security Notes

- ✅ API key is server-side only (not exposed to client)
- ✅ Input validation and error handling included
- ✅ Rate limiting protection
- ✅ No sensitive data stored

## Testing the Integration

1. **Start your dev server**: `npm run dev`
2. **Look for the chat button**: Blue floating button in bottom-right corner
3. **Click to open**: Chat interface should appear
4. **Test with a question**: Try "¿Qué es BIZEN?" or "¿Cómo funciona el sistema de módulos?"

## Troubleshooting

### If you see "Error de configuración del servicio":
- Check that `OPENAI_API_KEY` is set in `.env.local`
- Restart your dev server after adding the key
- Verify the API key is valid

### If you see "Servicio temporalmente ocupado":
- OpenAI API rate limits - wait a few minutes
- Check your OpenAI account usage limits

### If the chat button doesn't appear:
- Check browser console for errors
- Ensure framer-motion is installed
- Verify the component is imported correctly in layout.tsx

