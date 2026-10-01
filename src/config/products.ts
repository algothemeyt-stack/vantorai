import { Product, DurationId, DiscountRule } from '../types';

export const DURATION_OPTIONS: { id: DurationId; label: string; months: number }[] = [
  { id: '1_month', label: '1 Month', months: 1 },
  { id: '3_months', label: '3 Months', months: 3 },
  { id: '6_months', label: '6 Months', months: 6 },
  { id: '12_months', label: '12 Months', months: 12 },
];

/**
 * Calculates dynamic customer price strictly adhering to the centralized duration formula:
 * 1 Month: Full monthly price
 * 3 Months: monthlyPrice * 3 * 0.75 (25% OFF)
 * 6 Months: monthlyPrice * 6 * 0.75 (25% OFF)
 * 12 Months: monthlyPrice * 12 * 0.75 (25% OFF)
 * Google AI: Fixed ₹950 for 1 Year (no discount)
 */
export function calculatePlanPrice(
  monthlyPrice: number,
  durationId: DurationId,
  discountRules: DiscountRule[]
): number {
  const duration = DURATION_OPTIONS.find((d) => d.id === durationId);
  if (!duration) return monthlyPrice;

  // Google AI fixed 1-Year pass
  if (discountRules.length === 0 && durationId === '12_months') {
    return monthlyPrice;
  }

  const basePrice = monthlyPrice * duration.months;
  const rule = discountRules.find((r) => r.durationId === durationId);

  if (!rule || rule.discountPercentage === 0) {
    return Math.round(basePrice);
  }

  const discounted = basePrice * (1 - rule.discountPercentage / 100);
  return Math.round(discounted);
}

/**
 * Calculates undiscounted base price for displaying savings (e.g. ₹1,500 with 25% OFF = ₹1,125)
 */
export function calculateBasePrice(
  monthlyPrice: number,
  durationId: DurationId,
  discountRules: DiscountRule[]
): number {
  const duration = DURATION_OPTIONS.find((d) => d.id === durationId);
  if (!duration) return monthlyPrice;

  // Google AI fixed 1-Year pass
  if (discountRules.length === 0 && durationId === '12_months') {
    return monthlyPrice;
  }

  return Math.round(monthlyPrice * duration.months);
}

export function formatPrice(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function getDurationLabel(durationId: DurationId): string {
  const found = DURATION_OPTIONS.find((d) => d.id === durationId);
  if (!found) return durationId;
  return found.label;
}

export const PRODUCT_IMAGE_MAP: Record<string, { name: string; image: string }> = {
  claude: {
    name: 'Claude',
    image: '/assets/products/claude.png',
  },
  chatgpt: {
    name: 'ChatGPT',
    image: '/assets/products/chatgpt.png',
  },
  higgsfield: {
    name: 'Higgsfield',
    image: '/assets/products/higgsfield.png',
  },
  gemini: {
    name: 'Google AI Studio / Gemini',
    image: '/assets/products/gemini.png',
  },
};

export function getProductImage(slugOrId: string): string {
  const key = slugOrId.toLowerCase();
  if (PRODUCT_IMAGE_MAP[key]) {
    return PRODUCT_IMAGE_MAP[key].image;
  }
  const found = PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId);
  return found?.image || '/assets/products/gemini.png';
}

export const PRODUCTS: Product[] = [
  {
    id: 'claude',
    slug: 'claude',
    name: 'Claude',
    image: '/assets/products/claude.png',
    tagline: 'Anthropic’s frontier AI for nuanced reasoning, coding, and synthesis',
    category: 'AI Assistants',
    startingPrice: 500,
    startingPriceLabel: 'From ₹500/month',
    rating: 4.9,
    reviewsCount: 342,
    logoAccent: 'from-amber-500 to-orange-600',
    badgeText: 'Developer Favorite',
    shortDescription: 'Unmatched coding intelligence, 200K token context window, and natural articulate writing.',
    longDescription: 'Access Anthropic’s flagship models including Claude 3.5 Sonnet and Opus. Ideal for software engineering, deep research, document synthesis, and multi-turn complex reasoning.',
    plans: [
      {
        id: 'claude-pro',
        name: 'Pro',
        badge: 'Popular',
        description: 'Standard 5x usage limits with full access to Claude 3.5 Sonnet & Claude 3 Opus.',
        monthlyPrice: 500,
        highlightFeatures: [
          'Full access to Claude 3.5 Sonnet & Opus',
          '200,000 token context window',
          'Claude Artifacts interactive workspace',
          'Priority access during high-traffic periods',
          'Early access to new feature releases',
        ],
      },
      {
        id: 'claude-max-5x',
        name: 'Max 5x',
        badge: 'High Usage',
        description: '5x higher message bandwidth tailored for power users, researchers, and active developers.',
        monthlyPrice: 900,
        highlightFeatures: [
          '5x higher capacity over standard limits',
          'Uninterrupted heavy coding sessions',
          'High-speed throughput & low latency',
          'Artifacts and Project Knowledge Bases',
          'Dedicated support routing',
        ],
      },
      {
        id: 'claude-max-20x',
        name: 'Max 20x',
        badge: 'Extreme Power',
        description: 'Massive 20x message capacity designed for enterprise engineers, agencies, and autonomous agents.',
        monthlyPrice: 1400,
        highlightFeatures: [
          '20x maximum allowance limits',
          'Virtually uncapped daily reasoning',
          'Top priority server clustering',
          'Highest concurrent task capacity',
          'Direct delivery concierge',
        ],
      },
    ],
    availableDurations: ['1_month', '3_months', '6_months', '12_months'],
    discountRules: [
      { durationId: '3_months', discountPercentage: 25 },
      { durationId: '6_months', discountPercentage: 25 },
      { durationId: '12_months', discountPercentage: 25 },
    ],
    features: [
      'Access to Claude 3.5 Sonnet and Claude 3 Opus',
      'Advanced coding, refactoring, and test suite generation',
      '200,000 token context window (process entire codebases or 500-page PDFs)',
      'Claude Artifacts for real-time frontend and UI rendering',
      'Knowledge Bases and Project custom instructions',
      'Direct email-based delivery without password sharing',
    ],
    howItWorks: [
      'Select your desired plan (Pro, Max 5x, or Max 20x) and duration.',
      'Enter your delivery email at checkout.',
      'Scan the payment QR code with any payment app to complete your order.',
      'Receive official activation instructions in your email inbox within 15-45 minutes.',
    ],
    deliveryInfo: {
      deliveryTime: '15 - 45 Minutes',
      method: 'Direct Email Invitation / Activation Credentials',
      requirements: ['Valid email address', 'No existing password required'],
    },
    faqs: [
      {
        question: 'What is the difference between Pro, Max 5x, and Max 20x?',
        answer: 'Pro provides standard high-volume access to Sonnet and Opus. Max 5x multiplies your allowance five-fold for developers running continuous debugging, while Max 20x offers maximum message velocity for enterprise workflows.',
      },
      {
        question: 'Do I get access to Claude Artifacts?',
        answer: 'Yes! All Claude plans supplied through VanTox Ai include full access to Anthropic’s Artifacts feature for previewing code, SVGs, charts, and interactive web apps.',
      },
      {
        question: 'Will I need to provide my Anthropic account password?',
        answer: 'Never. We strictly use email-based invitation and activation links. Your account credentials remain 100% private to you.',
      },
    ],
  },
  {
    id: 'chatgpt',
    slug: 'chatgpt',
    name: 'ChatGPT',
    image: '/assets/products/chatgpt.png',
    tagline: 'OpenAI’s premier ecosystem featuring GPT-4o, Canvas, and voice modes',
    category: 'AI Assistants',
    startingPrice: 600,
    startingPriceLabel: 'From ₹600/month',
    rating: 4.9,
    reviewsCount: 512,
    logoAccent: 'from-emerald-500 to-teal-600',
    badgeText: 'Global Bestseller',
    shortDescription: 'State-of-the-art multimodal AI, advanced voice mode, web browsing, and custom GPTs.',
    longDescription: 'Experience OpenAI’s frontier models including GPT-4o, OpenAI o1 reasoning model, Canvas collaborative editor, DALL-E 3 image generation, and custom GPT builders.',
    plans: [
      {
        id: 'chatgpt-plus',
        name: 'Plus',
        badge: 'Most Popular',
        description: 'Full access to GPT-4o, Advanced Voice, Canvas, and DALL-E 3.',
        monthlyPrice: 600,
        highlightFeatures: [
          'Unlimited standard GPT-4o messaging',
          'Access to OpenAI o1 reasoning series',
          'Advanced Voice Mode with realistic accents',
          'Canvas real-time writing & coding editor',
          'Custom GPTs marketplace & DALL-E 3 image creator',
        ],
      },
      {
        id: 'chatgpt-pro',
        name: 'Pro',
        badge: 'Enterprise Pro',
        description: 'Unlimited access to OpenAI o1-pro mode, highest message rate caps, and ultra-fast compute.',
        monthlyPrice: 1300,
        highlightFeatures: [
          'Unlimited access to o1-pro reasoning models',
          'Highest speed compute allocations',
          'Expanded file uploads and code execution compute',
          'Priority queuing on peak worldwide traffic',
          'VIP concierge onboarding',
        ],
      },
    ],
    availableDurations: ['1_month', '3_months', '6_months', '12_months'],
    discountRules: [
      { durationId: '3_months', discountPercentage: 25 },
      { durationId: '6_months', discountPercentage: 25 },
      { durationId: '12_months', discountPercentage: 25 },
    ],
    features: [
      'Full access to GPT-4o and OpenAI o1 reasoning models',
      'Advanced Voice mode with real-time natural inflection and interruptions',
      'DALL-E 3 high-resolution generative image studio',
      'Interactive Canvas for side-by-side text & code editing',
      'Deep Python code interpreter and CSV/data analysis engine',
      'Fast delivery directly to your verified email',
    ],
    howItWorks: [
      'Choose between ChatGPT Plus or Pro plan.',
      'Select your duration (1 Month, 3 Months, 6 Months, or 12 Months).',
      'Provide your delivery email address.',
      'Scan the payment QR code and complete payment.',
      'Receive official activation instructions in your inbox within 15-45 minutes.',
    ],
    deliveryInfo: {
      deliveryTime: '15 - 45 Minutes',
      method: 'Direct Email Invitation / Workspace License',
      requirements: ['Valid email address', 'No account password needed'],
    },
    faqs: [
      {
        question: 'Does this subscription include OpenAI o1 reasoning?',
        answer: 'Yes, ChatGPT Plus includes access to OpenAI o1 and o1-mini. ChatGPT Pro gives unlimited compute to o1-pro with deeper thinking steps.',
      },
      {
        question: 'Can I use Advanced Voice Mode on my iOS/Android app?',
        answer: 'Yes! Once activated, your subscription works seamlessly across web, iOS, iPadOS, macOS, Android, and Windows desktop apps.',
      },
      {
        question: 'Is my personal chat history kept private?',
        answer: 'Absolutely. We do not manage or view your individual account prompts or chats. Everything is securely tied to your own profile.',
      },
    ],
  },
  {
    id: 'higgsfield',
    slug: 'higgsfield',
    name: 'Higgsfield',
    image: '/assets/products/higgsfield.png',
    tagline: 'Next-generation cinematic AI video generation, camera motions, and avatars',
    category: 'AI Video',
    startingPrice: 1200,
    startingPriceLabel: 'From ₹1,200/month',
    rating: 4.8,
    reviewsCount: 189,
    logoAccent: 'from-fuchsia-600 to-pink-500',
    badgeText: 'Creator Essential',
    shortDescription: 'Create photorealistic video animations, 4K camera movements, and hyper-realistic human avatars.',
    longDescription: 'Higgsfield AI empowers filmmakers, commercial creators, and visual artists with cutting-edge cinematic diffusion models, director camera controls, and smooth temporal consistency.',
    plans: [
      {
        id: 'higgsfield-pro',
        name: 'Pro',
        badge: 'Recommended',
        description: 'Generous generation credits, 1080p rendering, and custom director controls.',
        monthlyPrice: 1200,
        highlightFeatures: [
          'Up to 1,500 monthly video generation credits',
          '1080p Full HD video rendering',
          'Custom camera orbit, dolly, and crane motion controls',
          'Commercial license usage',
          'Standard queue priority',
        ],
      },
      {
        id: 'higgsfield-ultra',
        name: 'Ultra',
        badge: 'Studio Grade',
        description: '4K Ultra HD rendering, unlimited parallel queueing, and studio motion keyframes.',
        monthlyPrice: 2900,
        highlightFeatures: [
          '4,000 monthly high-fidelity credits',
          'Native 4K rendering & temporal upscaling',
          'Instant turbo generation queue',
          'Custom character fine-tuning & avatar seeds',
          'Full enterprise commercial rights',
        ],
      },
    ],
    availableDurations: ['1_month', '3_months', '6_months', '12_months'],
    discountRules: [
      { durationId: '3_months', discountPercentage: 25 },
      { durationId: '6_months', discountPercentage: 25 },
      { durationId: '12_months', discountPercentage: 25 },
    ],
    features: [
      'Cinematic video generation from simple text or reference image prompts',
      'Realistic human motion, face fidelity, and temporal fluidity',
      'Granular camera choreography (pan, tilt, zoom, dolly, 360 orbit)',
      'Character preservation across multiple consecutive scenes',
      'Commercial royalty-free output rights',
    ],
    howItWorks: [
      'Pick Pro or Ultra depending on your resolution and credit requirements.',
      'Select your duration term (1 Month, 3 Months, 6 Months, or 12 Months).',
      'Enter your delivery email.',
      'Scan the payment QR code to pay.',
      'Receive access credentials within 15-45 minutes.',
    ],
    deliveryInfo: {
      deliveryTime: '15 - 45 Minutes',
      method: 'Email Delivery with Studio License Code',
      requirements: ['Valid email address'],
    },
    faqs: [
      {
        question: 'Can I export videos in 4K resolution?',
        answer: 'Yes, the Higgsfield Ultra tier includes native 4K output and temporal upscaling for crystal-clear cinematic renders.',
      },
      {
        question: 'Are generated videos commercial-use approved?',
        answer: 'Yes, both Pro and Ultra subscriptions include complete commercial rights for marketing, YouTube, film productions, and client campaigns.',
      },
    ],
  },
  {
    id: 'gemini',
    slug: 'gemini',
    name: 'Google AI Studio / Gemini',
    image: '/assets/products/gemini.png',
    tagline: 'Google’s 2M context window flagship AI with multimodal audio, video, and code analysis',
    category: 'AI Productivity',
    startingPrice: 950,
    startingPriceLabel: '₹950/year flat',
    rating: 4.9,
    reviewsCount: 275,
    logoAccent: 'from-blue-500 via-indigo-500 to-sky-400',
    badgeText: 'Incredible Value',
    shortDescription: 'Massive 2-Million token context window, Gemini 1.5 Pro multimodal reasoning, and deep Google Workspace integration.',
    longDescription: 'Harness Google’s most capable AI architecture. Process hours of video, audio files, hundred-thousand-line repositories, and complex multimodal datasets effortlessly.',
    plans: [
      {
        id: 'gemini-annual',
        name: 'Google AI Annual Plan',
        badge: 'Best Value',
        description: 'Complete 1-Year access to Gemini Advanced & Google AI Studio benefits for ₹950 flat.',
        monthlyPrice: 950, // fixed ₹950 for 1 year
        highlightFeatures: [
          'Full 1-Year access (365 days)',
          'Gemini 1.5 Pro with up to 2 Million token context',
          'Multimodal analysis across video, audio, PDFs, and codebases',
          'Google AI Studio high-quota throughput',
          'Fast email-based activation',
        ],
      },
    ],
    availableDurations: ['12_months'], // ONLY 1 Year - no 1M, 3M, 6M
    discountRules: [], // No discount for Google AI
    features: [
      'Gemini 1.5 Pro with industry-record 2,000,000 token context window',
      'Upload 1 hour of video or 11 hours of audio in a single prompt',
      'Deep cross-referencing across massive document archives',
      'Full 12 months (365 days) continuous coverage for just ₹950 flat',
      'Direct email activation without giving up your Google credentials',
    ],
    howItWorks: [
      'Select the 1-Year Google AI Annual Plan.',
      'Enter your delivery email address.',
      'Scan the payment QR code for ₹950 and complete payment.',
      'Receive your activation link within 15-45 minutes.',
    ],
    deliveryInfo: {
      deliveryTime: '15 - 45 Minutes',
      method: 'Direct Email Invitation Link',
      requirements: ['Valid email address', 'No password required'],
    },
    faqs: [
      {
        question: 'Is this really ₹950 for the entire year?',
        answer: 'Yes! Our Google AI Annual plan is fixed at ₹950 for a full 365-day access period. There are zero hidden monthly rebills.',
      },
      {
        question: 'What is the context window capacity?',
        answer: 'You receive access to Gemini 1.5 Pro which supports up to 2,000,000 tokens of input context, allowing you to ingest massive codebases and books in one prompt.',
      },
    ],
  },
];

export const CATEGORIES = [
  {
    id: 'AI Assistants',
    name: 'AI Assistants',
    tagline: 'Frontier reasoning & conversational agents',
    description: 'Anthropic Claude 3.5 Sonnet & OpenAI ChatGPT Plus / Pro with code interpreter and voice modes.',
    iconName: 'Bot',
    badge: 'Popular',
    accent: 'from-amber-500/10 to-orange-500/10 text-amber-600',
    borderHover: 'hover:border-amber-300',
  },
  {
    id: 'AI Video',
    name: 'AI Video',
    tagline: 'Cinematic generation & visual storytelling',
    description: 'Higgsfield Pro & Ultra for studio-grade motion choreography, avatar creation, and 4K upscaling.',
    iconName: 'Video',
    badge: 'Trending',
    accent: 'from-fuchsia-500/10 to-pink-500/10 text-fuchsia-600',
    borderHover: 'hover:border-fuchsia-300',
  },
  {
    id: 'AI Productivity',
    name: 'AI Productivity',
    tagline: '2M context reasoning & deep workflows',
    description: 'Google AI Studio & Gemini 1.5 Pro for processing massive documents, videos, and full repositories.',
    iconName: 'Zap',
    badge: 'High Value',
    accent: 'from-blue-500/10 to-indigo-500/10 text-blue-600',
    borderHover: 'hover:border-blue-300',
  },
  {
    id: 'AI Creative Tools',
    name: 'AI Creative Tools',
    tagline: 'Art, graphics, and multimodal design',
    description: 'Interactive Canvas, DALL-E 3, motion generators, and generative image synthesis suites.',
    iconName: 'Sparkles',
    badge: 'Creative',
    accent: 'from-purple-500/10 to-violet-500/10 text-purple-600',
    borderHover: 'hover:border-purple-300',
  },
];

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    firstName: 'Marcus',
    city: 'Berlin',
    country: 'Germany',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 days ago',
    productPurchased: 'Claude Pro (6 Months)',
    review: 'Activated in about 20 minutes after completing payment via QR code. The 200k context in Claude 3.5 Sonnet has completely changed how I refactor my TypeScript backends.',
    isVerifiedDemo: true,
  },
  {
    id: 'rev-2',
    firstName: 'Elena',
    city: 'Toronto',
    country: 'Canada',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    productPurchased: 'ChatGPT Plus (12 Months)',
    review: 'Cleanest checkout experience I have seen. No password asked, just my email and quick QR scan. Worked smoothly on both desktop and my iPhone.',
    isVerifiedDemo: true,
  },
  {
    id: 'rev-3',
    firstName: 'Rajesh',
    city: 'Bengaluru',
    country: 'India',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    productPurchased: 'Google AI Annual Plan (₹950)',
    review: 'Getting a full year of Gemini 1.5 Pro for ₹950 flat sounded too good to be true, but it was verified and delivered right away. Great customer support on Telegram too.',
    isVerifiedDemo: true,
  },
  {
    id: 'rev-4',
    firstName: 'Sophie',
    city: 'London',
    country: 'UK',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    productPurchased: 'Higgsfield Ultra (3 Months)',
    review: 'The camera movement tools on Higgsfield Ultra are mind-blowing for commercial client b-roll. Ordering via QR scan took less than a minute.',
    isVerifiedDemo: true,
  },
  {
    id: 'rev-5',
    firstName: 'David',
    city: 'Austin',
    country: 'USA',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 weeks ago',
    productPurchased: 'Claude Max 5x (3 Months)',
    review: 'Standard Claude limits were bottlenecking my day. Upgraded to Max 5x through VanTox Ai and have zero rate-limit interruptions now.',
    isVerifiedDemo: true,
  },
  {
    id: 'rev-6',
    firstName: 'Kenji',
    city: 'Tokyo',
    country: 'Japan',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 month ago',
    productPurchased: 'ChatGPT Pro (1 Month)',
    review: 'Tested the o1-pro models for advanced algorithmic competition problems. Response time was instant and the delivery team checked in on Telegram to make sure it was working.',
    isVerifiedDemo: true,
  },
  {
    id: 'rev-7',
    firstName: 'Chloe',
    city: 'Melbourne',
    country: 'Australia',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 month ago',
    productPurchased: 'Claude Pro (12 Months)',
    review: 'Saved significantly with the 12-month duration 25% discount. Beautiful interface and transparent pricing. 10/10 recommend.',
    isVerifiedDemo: true,
  },
];

export const GENERAL_FAQS = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept payments directly via Scan & Pay QR Code. Simply scan the payment QR code displayed at checkout using any payment or UPI app to complete your order immediately.',
  },
  {
    question: 'How does delivery work?',
    answer: 'Delivery instructions or official workspace/activation invitations are delivered directly to the email address you enter during checkout. Standard delivery occurs within 15 to 45 minutes.',
  },
  {
    question: 'Do you need my password?',
    answer: 'No. We do not require your account password for email-based delivery. Your account security remains strictly under your control.',
  },
  {
    question: 'How do I choose the correct plan?',
    answer: 'For coding and deep document reasoning, Claude Pro or Max tiers are top rated. For multimodal generation, voice mode, and general knowledge, ChatGPT Plus is ideal. For cinematic video generation, Higgsfield Pro or Ultra is best. For processing huge archives and multi-hour recordings, Google AI Annual plan offers the largest context window for ₹950 flat.',
  },
  {
    question: 'Can I change my plan?',
    answer: 'Yes! When your current billing term nears completion or if you need to upgrade to a higher tier (e.g. from Claude Pro to Claude Max 5x or 20x), you can simply purchase the upgraded plan for your preferred duration.',
  },
  {
    question: 'What happens after payment?',
    answer: 'Your order ID is generated immediately upon checkout. If you encounter any question, our verified Telegram concierge support is available 24/7 to assist.',
  },
  {
    question: 'How can I contact support?',
    answer: 'Our concierge support team is active 24/7 on Telegram at https://t.me/VanTorAii, as well as via email at support@vantox-ai.store.',
  },
  {
    question: 'Are these official subscriptions or reseller products?',
    answer: 'VanTox Ai operates as an independent subscription concierge service providing genuine enterprise seat allocations, gift licenses, and activation vouchers. We are not officially affiliated with or endorsed by Anthropic, OpenAI, Higgsfield, or Google.',
  },
  {
    question: 'Having any issue with your payment?',
    answer: 'If you have any questions or need custom assistance, contact our 24/7 Telegram support team at https://t.me/VanTorAii for immediate concierge help.',
  },
];
