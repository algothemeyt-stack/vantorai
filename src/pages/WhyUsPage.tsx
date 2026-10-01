import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Mail, 
  KeyRound, 
  Lock, 
  Headphones, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface WhyUsPageProps {
  onExplorePlans: () => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ onExplorePlans }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const reasons = [
    {
      title: 'Transparent Member Pricing',
      description: 'Clear, straightforward rates with no recurring card surprises. You pay once for the exact duration you select.',
      icon: ShieldCheck,
    },
    {
      title: '15–45m Email Dispatch',
      description: `Orders are processed immediately upon payment and fulfilled within ${siteConfig.deliveryEstimate}.`,
      icon: Clock,
    },
    {
      title: 'Direct Inbox Delivery',
      description: 'Seat invitations and official activation vouchers are sent directly to the email specified at checkout.',
      icon: Mail,
    },
    {
      title: 'Zero Password Collection',
      description: 'We do not require or ask for your account password. Your credentials stay strictly under your control.',
      icon: KeyRound,
    },
    {
      title: 'Instant QR Settlement',
      description: 'Payments via Scan & Pay QR provide instant settlement, zero foreign transaction fees, and fast activation.',
      icon: Lock,
    },
    {
      title: '24/7 Human Concierge',
      description: `Active customer care on Telegram ready to assist anytime. ${siteConfig.support.responseTime}.`,
      icon: Headphones,
    },
  ];

  const whyUsFaqs = [
    {
      question: 'Why are your prices lower than standard retail rates?',
      answer: 'We leverage volume corporate enterprise quotas, multi-seat developer agreements, and direct bulk allocations to pass substantial savings directly to our members.',
    },
    {
      question: 'Do I need to provide my personal Google or OpenAI passwords?',
      answer: 'Never. All allocations are fulfilled via direct organization workspace invitations or dedicated account vouchers. We never collect, see, or store passwords.',
    },
    {
      question: 'How fast do I receive my access after paying?',
      answer: `Our automated dispatch pipeline processes incoming payments immediately. Activation instructions arrive in your email inbox within ${siteConfig.deliveryEstimate}.`,
    },
    {
      question: 'What happens when my duration expires?',
      answer: 'There are no surprise recurring card charges. When your plan term nears completion, you will receive an optional email invitation to extend at member pricing.',
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#FAFAF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Store Principles
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Why Choose VanTox Ai
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 leading-relaxed">
            We built VanTox Ai to solve international payment blocks, recurring card traps, and expensive retail subscription tiers for high-demand AI tools.
          </p>
        </div>

        {/* 6 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 flex items-center justify-center mb-5 group-hover:bg-stone-900 group-hover:text-white transition-all shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-white mb-20 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
              Direct Retail vs. VanTox Ai
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Say Goodbye to Failed International Card Charges
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Most AI platforms reject foreign credit cards or charge recurring foreign transaction fees. VanTox Ai provides instantaneous QR scan settlement with zero recurring charges.
            </p>

            <div className="pt-2">
              <button
                onClick={onExplorePlans}
                className="px-8 py-4 rounded-full bg-white text-stone-900 hover:bg-stone-100 font-bold text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-stone-800" />
                <span>Explore Available Subscriptions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Mini FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {whyUsFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 hover:text-black cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
