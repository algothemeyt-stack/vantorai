import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      await fetch('/api/telegram/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: formData.orderId || 'SUPPORT-TICKET',
          product: 'Customer Support Inquiry',
          customerEmail: formData.email,
          status: 'Direct Customer Message',
          items: [{ productName: `Message from ${formData.name}: "${formData.message}"`, planName: 'Inquiry', quantity: 1, totalPrice: 0 }],
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Support dispatch attempt:', err);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAFAF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Concierge Support • {siteConfig.support.responseTime}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Contact Support Concierge
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 leading-relaxed">
            Our team is available 24/7 on Telegram to assist with payment confirmations, enterprise allocations, and order delivery status.
          </p>
        </div>

        {/* Contact Cards: Telegram (Primary) and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl gap-6 mb-16 mx-auto">
          
          {/* Card 1: Telegram (Primary Channel) */}
          <div className="bg-white rounded-3xl p-7 border-2 border-stone-900 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left group relative">
            <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider">
              Fastest Response
            </span>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-2xs">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mb-1">Telegram Support</h3>
              <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                Fastest response channel for payment questions, custom orders, and immediate assistance.
              </p>
              <div className="font-mono text-xs font-bold text-stone-900 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                {siteConfig.support.telegramUsername}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-100">
              <a
                href={siteConfig.support.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                id="contact-telegram-btn"
              >
                <span>Message on Telegram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Official Support Email */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-2xs">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mb-1">Official Email</h3>
              <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                For corporate invoicing, bulk allocations, and partnership inquiries.
              </p>
              <div className="font-mono text-xs font-bold text-stone-900 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                {siteConfig.support.email}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-100">
              <a
                href={`mailto:${siteConfig.support.email}`}
                className="w-full py-3 px-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Send Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Support Message Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-2xs">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Leave a Direct Message
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Send your inquiry directly to our concierge queue.
            </p>
          </div>

          {formSubmitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-stone-900">Message Dispatched</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Thank you. We have received your inquiry and our support team will respond to {formData.email} within 15 minutes.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', orderId: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                  Order Reference <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  placeholder="e.g. ALX-2026-XXXX"
                  className="w-full px-4 py-2.5 text-xs font-mono font-medium rounded-xl border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your issue, order question, or request..."
                  className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Dispatch Message to Support</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
