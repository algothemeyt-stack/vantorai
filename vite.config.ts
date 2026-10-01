import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function telegramApiPlugin(): Plugin {
  return {
    name: 'telegram-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/telegram/notify' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = body ? JSON.parse(body) : {};
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
              } = data;

              const botToken = process.env.TELEGRAM_BOT_TOKEN;
              const chatId = process.env.TELEGRAM_CHAT_ID;

              // Format Telegram message
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
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(
                    JSON.stringify({
                      success: true,
                      delivered: result.ok === true,
                      details: result,
                    })
                  );
                } catch (apiErr: any) {
                  console.error('[Telegram API Call Failed]', apiErr);
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(
                    JSON.stringify({
                      success: true,
                      delivered: false,
                      error: apiErr.message,
                      note: 'Order recorded on server, failed to contact Telegram API.',
                    })
                  );
                }
              } else {
                res.setHeader('Content-Type', 'application/json');
                return res.end(
                  JSON.stringify({
                    success: true,
                    delivered: false,
                    note: 'Order recorded successfully server-side. Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment secrets to send live notifications.',
                  })
                );
              }
            } catch (err: any) {
              console.error('[Telegram Middleware Error]', err);
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (req.url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ status: 'ok', brand: 'Alexa Ai', timestamp: new Date().toISOString() }));
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), telegramApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
