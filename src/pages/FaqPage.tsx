import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Send, Search } from 'lucide-react';
import { GENERAL_FAQS } from '../config/products';
import { siteConfig } from '../config/siteConfig';

export const FaqPage: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1, 2]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = GENERAL_FAQS.filter((f) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
  });

  return (
    <div className="py-12 sm:py-20 bg-[#FAFAF9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Help & Guidance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 leading-relaxed">
            Everything you need to know about payments, fulfillment timelines, security policies, and subscription durations.
          </p>

          {/* Search bar */}
          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. password, delivery, pricing)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs font-medium rounded-full bg-white border border-stone-200 shadow-2xs focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-6 text-stone-500 text-xs sm:text-sm">
              No matching answers found for "{searchQuery}". Please contact our 24/7 concierge below.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 hover:text-black cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Telegram Direct Assistance Box */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <HelpCircle className="w-8 h-8 text-stone-300 mx-auto" />
          <h3 className="text-xl sm:text-2xl font-bold">Still have questions?</h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Our support operators are ready on Telegram to verify transactions, answer questions, or arrange alternative payment options.
          </p>
          <div className="pt-2">
            <a
              href={siteConfig.support.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs shadow-md transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Message {siteConfig.support.telegramUsername} on Telegram</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
