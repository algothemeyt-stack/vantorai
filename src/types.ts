export type DurationId = '1_month' | '3_months' | '6_months' | '12_months';

export interface DurationOption {
  id: DurationId;
  label: string;
  months: number;
}

export interface PlanPricing {
  monthlyPrice: number; // Base monthly price in INR (₹)
}

export interface ProductPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  highlightFeatures: string[];
}

export interface DiscountRule {
  durationId: DurationId;
  discountPercentage: number; // e.g., 25 means 25% discount
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  tagline: string;
  category: 'AI Assistants' | 'AI Video' | 'AI Productivity' | 'AI Creative Tools';
  startingPrice: number;
  startingPriceLabel: string;
  rating: number;
  reviewsCount: number;
  logoAccent: string;
  badgeText?: string;
  shortDescription: string;
  longDescription: string;
  plans: ProductPlan[];
  availableDurations: DurationId[];
  discountRules: DiscountRule[];
  features: string[];
  howItWorks: string[];
  deliveryInfo: {
    deliveryTime: string;
    method: string;
    requirements: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CartItem {
  id: string; // unique item id: `${productId}-${planId}-${durationId}`
  productId: string;
  productName: string;
  planId: string;
  planName: string;
  durationId: DurationId;
  durationLabel: string;
  quantity: number;
  unitPrice: number; // calculated price for this plan & duration
  totalPrice: number; // unitPrice * quantity
  logoAccent: string;
  image?: string;
}

export type PaymentStatus = 'Awaiting Payment' | 'Payment Initiated' | 'Completed';

export interface OrderObject {
  orderId: string;
  product: string;
  plan: string;
  duration: string;
  quantity: number;
  email: string;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  items?: CartItem[];
}

export interface Review {
  id: string;
  firstName: string;
  city: string;
  country: string;
  avatarUrl: string;
  rating: number;
  date: string;
  productPurchased: string;
  review: string;
  isVerifiedDemo: boolean;
}

export interface SiteConfig {
  storeName: string;
  brandName: string;
  topAnnouncement: string;
  support: {
    telegramUrl: string;
    telegramUsername: string;
    whatsappUrl: string;
    whatsappNumber: string;
    email: string;
    responseTime: string;
  };
  payment: {
    qrImage: string;
    method: string;
    instruction: string;
  };
  deliveryEstimate: string;
  sellerDisclaimer: string;
}
