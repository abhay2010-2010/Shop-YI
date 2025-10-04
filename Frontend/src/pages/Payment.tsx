import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// We must replace 'useNavigate' from 'react-router-dom' with a simple
// function call since we cannot guarantee the routing context.
// In a real app, you would use: import { useNavigate } from "react-router-dom";

// Define the shape of the custom message/toast
type MessageType = 'success' | 'error' | 'loading' | null;

// --- Helper Components for Icons/Assets (Replacing local images) ---

// Placeholder SVG for the Chip
const CardChip: React.FC = () => (
  <svg className="w-10 h-10 text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" ry="3" fill="currentColor" fillOpacity="0.1" />
    <circle cx="9" cy="12" r="3" fill="currentColor" />
    <path d="M14 12h-2" />
    <path d="M16 9h-4" />
    <path d="M16 15h-4" />
  </svg>
);

// Placeholder SVG for Visa Logo
const VisaLogo: React.FC = () => (
  <svg className="w-16 h-10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" ry="2" fill="#1A237E"/>
    <path d="M5 8l4 8M13 8l-4 8" stroke="#FFFFFF" fill="none"/>
    <circle cx="17" cy="12" r="3" fill="#FFC107" stroke="#FFC107" />
  </svg>
);

// --- Custom Toast Component (Replacing @chakra-ui/react useToast) ---
interface CustomMessage {
    type: MessageType;
    title: string;
    description: string;
}

interface CustomToastProps {
    message: CustomMessage | null;
    onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, onClose }) => {
    if (!message || !message.type) return null;

    const baseClasses = "fixed top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-2xl z-50 transition-all duration-300 ease-in-out flex items-center space-x-3";
    let styleClasses = '';

    switch (message.type) {
        case 'success':
            styleClasses = 'bg-green-500 text-white';
            break;
        case 'error':
            styleClasses = 'bg-red-500 text-white';
            break;
        case 'loading':
            styleClasses = 'bg-blue-500 text-white animate-pulse';
            break;
        default:
            return null;
    }

    return (
        <div className={`${baseClasses} ${styleClasses}`}>
            <div>
                <h3 className="font-bold">{message.title}</h3>
                <p className="text-sm">{message.description}</p>
            </div>
            <button onClick={onClose} className="text-white opacity-70 hover:opacity-100 font-bold ml-4">
                &times;
            </button>
        </div>
    );
};
// --- End Custom Toast ---

function Payment() {
  // Local state for the custom message/toast
  const [message, setMessage] = useState<CustomMessage | null>(null);

  // Card form states
  const [cardNumber, setCardNumber] = useState("################");
  const [cardHolder, setCardHolder] = useState("FULL NAME");
  const [expMonth, setExpMonth] = useState("MM");
  const [expYear, setExpYear] = useState("YY");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const Navigate=useNavigate()
  // --- Input Handlers ---
  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value.replace(/\s/g, '').padEnd(16, '#'));
  };

  const handleCardHolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardHolder(event.target.value.toUpperCase() || 'FULL NAME');
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExpMonth(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExpYear(event.target.value.substring(2)); // Extract 'YY'
  };

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(event.target.value);
  };

  // --- Card Flip Logic ---
  const handleCvvHover = () => {
    setIsFlipped(true);
  };

  const handleCvvLeave = () => {
    setIsFlipped(false);
  };

  const showMessage = (type: MessageType, title: string, description: string) => {
    setMessage({ type, title, description });
    if (type !== 'loading') {
      setTimeout(() => setMessage(null), 4000);
    }
  };

  // --- Submission Logic (Simulated Checkout) ---
  // Replaced complex bookTicket/handleSubmit with a single simulation
  const handlePayment = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (
      cardNumber.trim().length < 16 ||
      cardHolder.trim() === 'FULL NAME' ||
      expMonth === 'MM' ||
      expYear === 'YY' ||
      cvv.trim().length < 3
    ) {
      showMessage('error', 'Validation Error ☹', 'Please fill in all card details correctly.');
      return;
    }

    setIsLoading(true);
    showMessage('loading', 'Payment is in progress', 'Please wait while we process your transaction.');

    // Simulate API call and ticket booking (replaces axios/backend logic)
    setTimeout(() => {
      // Assuming success after 2 seconds
      setIsLoading(false);
      showMessage('success', 'Payment successful 🤗', 'Thank you so much! Transaction complete.');

      // Simulate navigation after successful payment message
      setTimeout(() => {
        // In a real app, you would use: navigate("/")
      Navigate("/");
        setMessage(null); // Clear message before 'navigating'
      }, 2000);

    }, 2500);
  }, [cardNumber, cardHolder, expMonth, expYear, cvv]);

  // --- Helper for generating year options (2025 to 2035) ---
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gradient-to-br from-violet-50 to-slate-100">
      <CustomToast message={message} onClose={() => setMessage(null)} />

      <div className="flex flex-col lg:flex-row max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Card Display Container (Left Side) */}
        <div className="lg:w-1/2 p-8 bg-gray-900 flex items-center justify-center relative">
          <div className="w-full max-w-sm perspective-1000">
            {/* 3D Card Container */}
            <div
              className={`w-full h-60 relative transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : "rotate-y-0"}`}
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Card Front */}
              <div
                className="absolute top-0 left-0 w-full h-full p-6 rounded-xl shadow-2xl bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col justify-between backface-hidden"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <div className="flex justify-between items-start">
                  <CardChip />
                  <VisaLogo />
                </div>
                <div className="text-2xl sm:text-3xl font-mono tracking-widest text-white mt-4">
                  {cardNumber.match(/.{1,4}/g)?.join(' ') || '#### #### #### ####'}
                </div>
                <div className="flex justify-between items-center text-white text-xs uppercase font-medium mt-4">
                  <div className="flex flex-col">
                    <span>Card Holder:</span>
                    <span className="text-base font-semibold truncate w-32 sm:w-auto">{cardHolder}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Expires:</span>
                    <span className="text-base font-semibold">
                      {expMonth}/{expYear}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Back */}
              <div
                className="absolute top-0 left-0 w-full h-full p-6 rounded-xl shadow-2xl bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col justify-center items-end rotate-y-180 backface-hidden"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="w-full h-10 bg-gray-800 absolute top-8 left-0"></div>
                <div className="w-full text-white text-sm mt-16 flex flex-col items-start">
                  <span className="uppercase text-xs tracking-wider mb-1">CVV</span>
                  <div className="w-full h-10 bg-white text-gray-900 font-mono text-xl flex items-center justify-end px-3 rounded">
                    {cvv.padEnd(4, '*').replace(/./g, '*')}
                  </div>
                  <div className="mt-4">
                    <VisaLogo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container (Right Side) */}
        <form onSubmit={handlePayment} className="lg:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Details</h2>

          {/* Card Number */}
          <div className="space-y-2">
            <span className="block text-sm font-medium text-gray-700">Card Number</span>
            <input
              type="text"
              maxLength={16}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
              onChange={handleCardNumberChange}
              placeholder="e.g. 1234567890123456"
              required
              disabled={isLoading}
            />
          </div>

          {/* Card Holder */}
          <div className="space-y-2">
            <span className="block text-sm font-medium text-gray-700">Card Holder</span>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
              onChange={handleCardHolderChange}
              placeholder="Full Name"
              required
              disabled={isLoading}
            />
          </div>

          {/* Expiration and CVV */}
          <div className="flex space-x-4">
            {/* Expiration Month */}
            <div className="w-1/3 space-y-2">
              <span className="block text-sm font-medium text-gray-700">Expiration Month</span>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors" onChange={handleMonthChange} required disabled={isLoading}>
                <option value="MM" disabled>Month</option>
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                    <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Expiration Year */}
            <div className="w-1/3 space-y-2">
              <span className="block text-sm font-medium text-gray-700">Expiration Year</span>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors" onChange={handleYearChange} required disabled={isLoading}>
                <option value="YY" disabled>Year</option>
                {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* CVV */}
            <div className="w-1/3 space-y-2">
              <span className="block text-sm font-medium text-gray-700">CVV</span>
              <input
                type="text"
                maxLength={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={handleCvvChange}
                onFocus={handleCvvHover}
                onBlur={handleCvvLeave}
                placeholder="XXX"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mt-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 
              ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
          >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
              <span>Confirm Payment</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
