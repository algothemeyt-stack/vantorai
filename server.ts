import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API endpoint for Telegram notification
  app.post('/api/telegram/notify', async (req, res) => {
    try {
      const {
        orderId,
        product,
        plan,
        duration,
        amount,
        paymentMethod = 'Scan & Pay QR',
        customerEmail,
        status = 'Order Initiated',
        items = [],
        timestamp = new Date().toISOString(),
      } = req.body;

      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      // Construct Telegram message
      let message = `🔔 *New Order Notification - VanTox Ai*\n\n`;
      message += `🆔 *Order Reference:* \`${orderId || 'VT-ORDER'}\`\n`;
      if (Array.isArray(items) && items.length > 0) {
        message += `📦 *Subscriptions Ordered:*\n`;
        items.forEach((item: any) => {
          message += `  • *${item.productName}* (${item.planName}${item.durationLabel ? ` - ${item.durationLabel}` : ''}) × ${item.quantity || 1} — ₹${item.totalPrice}\n`;
        });
      } else if (product) {
        message += `📦 *Product:* ${product} (${plan || 'Plan'}${duration ? ` - ${duration}` : ''})\n`;
      }
      message += `💰 *Total Amount:* ₹${amount}\n`;
      message += `💳 *Payment Method:* ${paymentMethod}\n`;
      message += `📬 *Customer Delivery Email:* ${customerEmail || 'Not provided'}\n`;
      message += `⏱ *Time:* ${new Date(timestamp).toLocaleString()}\n`;
      message += `ℹ️ *Status:* ${status}\n`;

      console.log(`[Telegram Server] Order submission received: Ref=${orderId}, Email=${customerEmail}, Total=₹${amount}`);

      if (botToken && chatId) {
        try {
          const telegramResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown',
              }),
            }
          );
          const result = await telegramResponse.json();
          return res.json({
            success: true,
            delivered: result.ok === true,
            details: result,
          });
        } catch (apiErr: any) {
          console.error('[Telegram API Call Failed]', apiErr);
          return res.json({
            success: true,
            delivered: false,
            error: apiErr.message,
            note: 'Order recorded on server, failed to contact Telegram API.',
          });
        }
      } else {
        return res.json({
          success: true,
          delivered: false,
          note: 'Order recorded successfully server-side. Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment secrets to send live notifications.',
        });
      }
    } catch (err: any) {
      console.error('[Telegram Notify Error]', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Internal server error',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'Alexa Ai', timestamp: new Date().toISOString() });
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
