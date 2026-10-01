import { SiteConfig } from '../types';

export const SITE_CONFIG = {
  brandName: 'VanTox Ai',

  telegram: {
    url: 'https://t.me/VanTorAii',
    handle: '@VanTorAii',
    buttonText: 'Contact on Telegram',
    supportText: 'Telegram Support',
  },

  payment: {
    qrImage: '/payment-qr.png',
    method: 'Scan & Pay',
    instruction: 'Scan the QR code using any UPI or payment app to complete your order.',
  },

  contact: {
    whatsapp: '',
    phone: '',
    email: 'support@vantox-ai.store',
  },
};

export const siteConfig: SiteConfig = {
  storeName: 'VanTox Ai',
  brandName: SITE_CONFIG.brandName,
  topAnnouncement: 'Official AI Subscription Store • Instant Email Delivery • Zero Passwords',
  support: {
    telegramUrl: SITE_CONFIG.telegram.url,
    telegramUsername: SITE_CONFIG.telegram.handle,
    whatsappUrl: SITE_CONFIG.contact.whatsapp ? `https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}` : '',
    whatsappNumber: SITE_CONFIG.contact.whatsapp,
    email: SITE_CONFIG.contact.email,
    responseTime: 'Usually replies in under 15 minutes',
  },
  payment: {
    qrImage: SITE_CONFIG.payment.qrImage,
    method: SITE_CONFIG.payment.method,
    instruction: SITE_CONFIG.payment.instruction,
  },
  deliveryEstimate: '15 to 45 minutes after payment',
  sellerDisclaimer: 'VanTox Ai is an independent digital subscription concierge and provider service. All product names, logos, and brands are property of their respective owners.',
};
