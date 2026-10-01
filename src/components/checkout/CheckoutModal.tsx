import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Clock, 
  Minus, 
  Plus, 
  ExternalLink,
  RotateCcw,
  QrCode
} from 'lucide-react';
import { CartItem, OrderObject } from '../../types';
import { SITE_CONFIG, siteConfig } from '../../config/siteConfig';
import { formatPrice, getProductImage } from '../../config/products';
import { useCart } from '../../context/CartContext';
import { AlexaLogo } from '../common/AlexaLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items: initialItems,
}) => {
  const { addOrder } = useCart();

  // Local checkout items copy for Step 1 adjustments
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>(initialItems);

  // Steps: 1 = Review Items, 2 = Delivery Email, 3 = Payment Screen
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Customer email ONLY (No Telegram username requested)
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Order reference ID (format VT-XXXXXX as required)
  const [orderId, setOrderId] = useState('VT-000000');

  // 5-Minute Payment Countdown Timer (300 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(300);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      setCheckoutItems(initialItems);
      setCurrentStep(1);
      setEmail('');
      setEmailError('');
      setSecondsRemaining(300);

      // Generate format VT-XXXXXX
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setOrderId(`VT-${randomCode}`);
    }
  }, [initialItems, isOpen]);

  // 5-minute countdown timer in Step 3
  useEffect(() => {
    if (isOpen && currentStep === 3) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, currentStep]);

  if (!isOpen || checkoutItems.length === 0) return null;

  const orderTotal = Math.round(
    checkoutItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
  );

  const primaryItem = checkoutItems[0];
  const displayProductName =
    checkoutItems.length > 1
      ? `${checkoutItems.length} Subscriptions (${primaryItem.productName} + more)`
      : `${primaryItem.productName} (${primaryItem.planName})`;

  const displayDuration =
    checkoutItems.length > 1
      ? 'Custom Terms'
      : primaryItem.durationLabel;

  // Format seconds mm:ss
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Quantity updater
  const handleQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCheckoutItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            }
          : item
      )
    );
  };

  // Step 2 Submission -> Notifies admin server-side and displays QR Payment Screen
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address for delivery.');
      return;
    }
    setEmailError('');

    const newOrder: OrderObject = {
      orderId,
      product: displayProductName,
      plan: checkoutItems.length > 1 ? 'Multi-Item Order' : primaryItem.planName,
      duration: displayDuration,
      quantity: checkoutItems.reduce((s, i) => s + i.quantity, 0),
      email: email.trim(),
      total: orderTotal,
      paymentMethod: 'Scan & Pay QR',
      paymentStatus: 'Awaiting Payment',
      createdAt: new Date().toISOString(),
      items: checkoutItems,
    };

    addOrder(newOrder);

    // Notify server-side admin telegram integration (no customer Telegram requested)
    fetch('/api/telegram/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        product: newOrder.product,
        plan: newOrder.plan,
        duration: displayDuration,
        amount: orderTotal,
        paymentMethod: 'Scan & Pay QR',
        customerEmail: email.trim(),
        status: 'Order Checkout Initiated',
        items: checkoutItems,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.warn('Admin notification logged:', err));

    setSecondsRemaining(300);
    setCurrentStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* ======================================================== */}
        {/* HEADER                                                   */}
        {/* ======================================================== */}
        <div className="px-6 py-4 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center p-0.5 shadow-2xs overflow-hidden">
              <AlexaLogo variant="icon" size="sm" theme="light" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 leading-tight">
                Express Checkout
              </h3>
              <p className="text-[11px] text-stone-500 font-mono">
                Order ID: <span className="font-semibold text-stone-800">{orderId}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
            id="checkout-close-btn"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* BODY                                                     */}
        {/* ======================================================== */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">

          {/* Step Indicators */}
          <div className="flex items-center justify-between text-xs font-semibold text-stone-400 border-b border-stone-100 pb-3">
            <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-stone-900 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-stone-900 text-white' : 'bg-stone-200'}`}>
                1
              </span>
              <span>Review</span>
            </div>
            <span className="text-stone-300">———</span>
            <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-stone-900 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-stone-900 text-white' : 'bg-stone-200'}`}>
                2
              </span>
              <span>Email</span>
            </div>
            <span className="text-stone-300">———</span>
            <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-stone-900 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 3 ? 'bg-stone-900 text-white' : 'bg-stone-200'}`}>
                3
              </span>
              <span>Pay</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STEP 1: REVIEW                                           */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Order Summary
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {checkoutItems.length} subscription {checkoutItems.length > 1 ? 'plans' : 'plan'}
                </span>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {checkoutItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={getProductImage(item.productId)}
                          alt={item.productName}
                          className="w-full h-full object-contain object-center"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-stone-900 leading-tight">
                          {item.productName}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          {item.planName} · {item.durationLabel}
                        </p>
                        <p className="text-xs font-bold text-stone-900 mt-0.5">
                          {formatPrice(item.unitPrice)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-stone-200">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-0.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-stone-900 min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-0.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Box */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">{formatPrice(orderTotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery</span>
                  <span className="font-medium text-emerald-700">Instant Email (Free)</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-stone-900 font-bold">
                  <span>Total Amount</span>
                  <span className="text-base font-black">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3.5 px-6 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  id="checkout-step1-continue"
                >
                  <span>Continue to Delivery Email</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: DELIVERY EMAIL ONLY (NO TELEGRAM FIELD)          */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <form onSubmit={handleContinueToPayment} className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Delivery Information
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Enter the email address where your access credentials will be delivered.
                </p>
              </div>

              {/* ONLY DELIVERY EMAIL ADDRESS */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Delivery Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-sm font-medium outline-none transition-all placeholder:text-stone-400 bg-white"
                  autoFocus
                  required
                  id="checkout-delivery-email-input"
                />
                {emailError && (
                  <p className="text-xs text-red-500 mt-1 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{emailError}</span>
                  </p>
                )}
                <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                  Your official invitation and access credentials will be sent to this email within 15–45 minutes.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2 text-xs text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero password requirement. Access is delivered directly to your inbox.</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-3 px-4 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-xs tracking-wide shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="checkout-step2-continue"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 3: CLEAN PAYMENT PAGE WITH UPLOADED QR CODE         */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-4">

              {/* Order Meta Bar */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/70">
                  <span className="font-semibold text-stone-500">Order ID:</span>
                  <span className="font-mono font-bold text-stone-900">{orderId}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block">{displayProductName}</span>
                    <span className="text-[11px] text-stone-500">{displayDuration}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Final Amount</span>
                    <span className="text-xl font-black text-stone-900">{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                <div className="pt-1 text-[11px] text-stone-500 border-t border-stone-200/50 flex justify-between">
                  <span>Delivery to:</span>
                  <span className="font-medium text-stone-800">{email}</span>
                </div>
              </div>

              {/* Clean QR Code Container */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex flex-col items-center text-center space-y-3">
                
                {/* Uploaded QR Image */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-white p-2 border border-stone-200 shadow-xs flex items-center justify-center overflow-hidden">
                  <img
                    src={siteConfig.payment.qrImage || '/payment-qr.png'}
                    alt="Payment QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Scan & Pay Instruction */}
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-stone-900 flex items-center justify-center gap-1.5">
                    <QrCode className="w-4 h-4 text-stone-800" />
                    <span>Scan & Pay</span>
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Scan with any UPI or payment app to transfer <strong>{formatPrice(orderTotal)}</strong>
                  </p>
                </div>
              </div>

              {/* 5-MINUTE COUNTDOWN TIMER */}
              <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                secondsRemaining === 0 
                  ? 'bg-rose-50 border-rose-200 text-rose-900' 
                  : 'bg-amber-500/10 border-amber-200 text-amber-950'
              }`}>
                <div className="flex items-center gap-2.5">
                  <Clock className={`w-4 h-4 shrink-0 ${secondsRemaining > 0 ? 'animate-pulse text-amber-700' : 'text-rose-600'}`} />
                  <div>
                    <span className="text-xs font-bold block leading-tight">
                      {secondsRemaining > 0 ? 'Complete payment within' : 'Payment window expired'}
                    </span>
                    <span className="text-[11px] opacity-80">
                      {secondsRemaining > 0 ? 'Order reservation active' : 'Click reset to restart timer'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {secondsRemaining > 0 ? (
                    <span className="font-mono text-base font-black tracking-wider tabular-nums bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs inline-block text-amber-950">
                      {formatTimer(secondsRemaining)}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSecondsRemaining(300)}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-600 text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              {/* ======================================================== */}
              {/* SUPPORT MESSAGE ONLY                                     */}
              {/* ======================================================== */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 text-center space-y-2.5">
                <p className="text-xs font-medium text-stone-600">
                  Any problem? Contact Support
                </p>

                <a
                  href={siteConfig.support.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-xs transition-colors shadow-xs"
                  id="checkout-contact-support-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Contact Support</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>

              {/* Navigation Back */}
              <div className="flex justify-between items-center pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-stone-500 hover:text-stone-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Back to Email</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer font-medium"
                >
                  Close
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
