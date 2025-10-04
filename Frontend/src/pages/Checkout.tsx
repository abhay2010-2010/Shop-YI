import axios from "axios"
import { useEffect, useState } from "react"

import Cart from "../components/Cart"
import type { CartItem } from "../types"

function Checkout() {
    const [cart, setCart] = useState<CartItem[]>(() => {
        return JSON.parse(localStorage.getItem("cart") || "[]")
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const updateQuantity = (id: number, newQty: number) => {
        if (newQty <= 0) return
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQty } : item
            )
        )
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const handleCheckout = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/checkout", {
                items: cart
            })
            alert(`✅ ${res.data.message} | Total: $${res.data.total}`)
            setCart([])
            localStorage.removeItem("cart")
        } catch (error) {
            alert("❌ Checkout failed")
        }
    }

    return (
        <div>
            <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />
            {cart.length > 0 && (
                <button
                    onClick={handleCheckout}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Checkout
                </button>
            )}
        </div>
    )
}

export default Checkout
