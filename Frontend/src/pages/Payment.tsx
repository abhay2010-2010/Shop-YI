import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

type MessageType = "success" | "error" | "loading" | null

const CardChip: React.FC = () => (
    <svg
        className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2">
        <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="3"
            ry="3"
            fill="currentColor"
            fillOpacity="0.1"
        />
        <circle cx="9" cy="12" r="3" fill="currentColor" />
    </svg>
)

const VisaLogo: React.FC = () => (
    <svg
        className="w-12 h-8 sm:w-16 sm:h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" fill="#1A237E" />
        <path d="M5 8l4 8M13 8l-4 8" stroke="#FFFFFF" />
        <circle cx="17" cy="12" r="3" fill="#FFC107" stroke="#FFC107" />
    </svg>
)

interface CustomMessage {
    type: MessageType
    title: string
    description: string
}

interface CustomToastProps {
    message: CustomMessage | null
    onClose: () => void
}

const CustomToast: React.FC<CustomToastProps> = ({ message, onClose }) => {
    if (!message || !message.type) return null

    const base =
        "fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3 text-white"
    const colors =
        message.type === "success"
            ? "bg-green-500"
            : message.type === "error"
              ? "bg-red-500"
              : "bg-blue-500 animate-pulse"

    return (
        <div className={`${base} ${colors}`}>
            <div>
                <h3 className="font-semibold">{message.title}</h3>
                <p className="text-sm">{message.description}</p>
            </div>
            <button onClick={onClose} className="font-bold text-lg ml-3">
                ×
            </button>
        </div>
    )
}

function Payment() {
    const [message, setMessage] = useState<CustomMessage | null>(null)
    const [cardNumber, setCardNumber] = useState("################")
    const [cardHolder, setCardHolder] = useState("FULL NAME")
    const [expMonth, setExpMonth] = useState("MM")
    const [expYear, setExpYear] = useState("YY")
    const [cvv, setCvv] = useState("")
    const [isFlipped, setIsFlipped] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardNumber(e.target.value.replace(/\s/g, "").padEnd(16, "#"))
    const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardHolder(e.target.value.toUpperCase() || "FULL NAME")
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setExpMonth(e.target.value)
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setExpYear(e.target.value.substring(2))
    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCvv(e.target.value)
    const handleCvvHover = () => setIsFlipped(true)
    const handleCvvLeave = () => setIsFlipped(false)

    const showMessage = (
        type: MessageType,
        title: string,
        description: string
    ) => {
        setMessage({ type, title, description })
        if (type !== "loading") setTimeout(() => setMessage(null), 4000)
    }

    const handlePayment = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (
                cardNumber.length < 16 ||
                cardHolder === "FULL NAME" ||
                expMonth === "MM" ||
                expYear === "YY" ||
                cvv.length < 3
            ) {
                showMessage(
                    "error",
                    "Invalid Input",
                    "Please fill all card details correctly."
                )
                return
            }

            setIsLoading(true)
            showMessage("loading", "Processing Payment", "Please wait...")
            setTimeout(() => {
                setIsLoading(false)
                showMessage("success", "Payment Successful", "Redirecting...")
                localStorage.removeItem("shoppingCart")
                setTimeout(() => {
                    navigate("/")
                    window.location.reload() // ✅ Force refresh after redirect
                }, 2000)
            }, 2500)
        },
        [cardNumber, cardHolder, expMonth, expYear, cvv]
    )

    const years = Array.from(
        { length: 11 },
        (_, i) => new Date().getFullYear() + i
    )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 p-4 sm:p-6 md:p-8">
            <CustomToast message={message} onClose={() => setMessage(null)} />

            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Left - Card Preview */}
                <div className="md:w-1/2 p-6 sm:p-8 bg-gray-900 flex items-center justify-center">
                    <div className="w-full max-w-xs sm:max-w-sm perspective">
                        <div
                            className={`relative w-full h-52 sm:h-60 transform transition-transform duration-700`}
                            style={{
                                transformStyle: "preserve-3d",
                                transform: isFlipped
                                    ? "rotateY(180deg)"
                                    : "rotateY(0deg)"
                            }}>
                            {/* Front */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900 p-5 sm:p-6 rounded-xl shadow-2xl text-white flex flex-col justify-between"
                                style={{ backfaceVisibility: "hidden" }}>
                                <div className="flex justify-between items-start">
                                    <CardChip />
                                    <VisaLogo />
                                </div>
                                <div className="text-lg sm:text-2xl font-mono tracking-widest mt-4">
                                    {cardNumber.match(/.{1,4}/g)?.join(" ") ||
                                        "#### #### #### ####"}
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm mt-3">
                                    <div>
                                        <p>Card Holder</p>
                                        <p className="font-semibold">
                                            {cardHolder}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Expires</p>
                                        <p className="font-semibold">
                                            {expMonth}/{expYear}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Back */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900 p-6 rounded-xl shadow-2xl rotate-y-180 text-white flex flex-col justify-center items-end"
                                style={{
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)"
                                }}>
                                <div className="w-full h-10 bg-gray-800 absolute top-6"></div>
                                <div className="mt-12 w-full">
                                    <p className="text-xs mb-1">CVV</p>
                                    <div className="w-full bg-white text-gray-900 px-3 py-2 rounded font-mono text-right">
                                        {cvv.replace(/./g, "*")}
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <VisaLogo />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Payment Form */}
                <form
                    onSubmit={handlePayment}
                    className="md:w-1/2 p-6 sm:p-8 space-y-5">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Payment Details
                    </h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Card Number
                        </label>
                        <input
                            type="text"
                            maxLength={16}
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleCardNumberChange}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Card Holder
                        </label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 border rounded-lg uppercase focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleCardHolderChange}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">
                                Month
                            </label>
                            <select
                                onChange={handleMonthChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                                disabled={isLoading}
                                required>
                                <option value="MM">MM</option>
                                {Array.from({ length: 12 }, (_, i) =>
                                    String(i + 1).padStart(2, "0")
                                ).map((m) => (
                                    <option key={m}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">
                                Year
                            </label>
                            <select
                                onChange={handleYearChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                                disabled={isLoading}
                                required>
                                <option value="YY">YY</option>
                                {years.map((y) => (
                                    <option key={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">
                                CVV
                            </label>
                            <input
                                type="text"
                                maxLength={4}
                                placeholder="XXX"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onFocus={handleCvvHover}
                                onBlur={handleCvvLeave}
                                onChange={handleCvvChange}
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 font-bold text-white rounded-lg transition-all duration-300 ${
                            isLoading
                                ? "bg-gray-400"
                                : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                        }`}>
                        {isLoading ? "Processing..." : "Confirm Payment"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Payment
