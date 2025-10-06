import { ArrowLeft, Loader2, ShoppingCart, Trash2 } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"
import type { CartItem } from "../types"

interface Props {
  cart: CartItem[]
  updateQuantity: (id: number, newQuantity: number) => void
  handleCheckout: () => Promise<void>
}

const formatCurrency = (amount: number): string => amount.toFixed(2)

const Checkout: React.FC<Props> = ({ cart, updateQuantity, handleCheckout }) => {
  const [isProcessing, setIsProcessing] = React.useState(false)
  const navigate = useNavigate()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 50
  const total = subtotal + shipping

  const handleCheckoutClick = async () => {
    setIsProcessing(true)
    await handleCheckout()
    setIsProcessing(false)
    navigate("/payment")
  }

  const increaseQuantity = (id: number, currentQty: number) => {
    const newQty = currentQty + 1
    updateQuantity(id, newQty)
  }

  const decreaseQuantity = (id: number, currentQty: number) => {
    const newQty = currentQty - 1
    if (newQty <= 0) {
      updateQuantity(id, 0) // remove item
    } else {
      updateQuantity(id, newQty)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
        <ShoppingCart className="w-8 h-8 mr-3 text-blue-600" />
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-inner">
          <p className="text-xl text-gray-600 font-semibold mb-4">
            Your cart is currently empty!
          </p>
          <p className="text-gray-500">
            Add some awesome products from the home page to continue shopping.
          </p>
          <button onClick={()=>window.history.back()}>Continue shopping...</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 rounded-xl shadow-md transition-shadow hover:shadow-lg">
                <img
                  src={
                    item.imageUrl ||
                    `https://placehold.co/100x100/A0BFFF/ffffff?text=${item.name}`
                  }
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-lg border p-1"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/100x100/A0BFFF/ffffff?text=${item.name}`
                  }}
                />

                <div className="flex-grow ml-4">
                  <h2 className="font-bold text-gray-900 line-clamp-1">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    ${formatCurrency(item.price)} each
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      disabled={isProcessing}>
                      -
                    </button>
                    <span className="px-3 py-1 font-semibold text-gray-800 bg-gray-50">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id, item.quantity)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      disabled={isProcessing}>
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => updateQuantity(item.id, 0)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                    disabled={isProcessing}
                    title="Remove item">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-2xl sticky top-28 h-fit border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-medium">${formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span className="font-medium text-green-600">
                  {shipping === 0 ? "FREE" : `$${formatCurrency(shipping)}`}
                </span>
              </div>
              <div className="flex justify-between font-extrabold text-lg pt-2 border-t border-gray-200 text-gray-900">
                <span>Order Total</span>
                <span>${formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              disabled={isProcessing || cart.length === 0}
              className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 
                ${
                  isProcessing || cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5"
                }`}>
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Proceed to Checkout</span>
              )}
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full mt-3 py-2 rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
