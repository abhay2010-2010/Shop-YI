import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"
import LikedProducts from "./pages/LikedProducts"
import type { CartItem, Product } from "./types" // Assuming types are here

import "./App.css"

import Payment from "./pages/Payment"
// import Footer from "./components/Footer"


const API_BASE_URL = "https://simple-shopping-cart-bpmz.onrender.com/api"

function App(): React.ReactElement {
    const [products, setProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<CartItem[]>([])
    const [likedIds, setLikedIds] = useState<number[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const savedCart = localStorage.getItem("shoppingCart")
        if (savedCart) setCart(JSON.parse(savedCart) as CartItem[])

        const savedLikes = localStorage.getItem("likedProducts")
        if (savedLikes) setLikedIds(JSON.parse(savedLikes) as number[])
    }, [])

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem("likedProducts", JSON.stringify(likedIds))
    }, [likedIds])

    // === Data Fetching ===
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products`)
                if (!response.ok)
                    throw new Error("Failed to fetch products from API.")

                const responseData: { success: boolean; products: Product[] } =
                    await response.json()

                const productArray = responseData?.products

                if (Array.isArray(productArray)) {
                    setProducts(productArray)
                } else {
                    console.error(
                        "API returned unexpected data structure:",
                        responseData
                    )
                    setError(
                        "The product data returned by the server is corrupted or has an unexpected format."
                    )
                    setProducts([])
                }
            } catch (err) {
                console.error("Fetch error:", err)
                setError(
                    "Could not load products. Please check the backend server."
                )
                setProducts([])
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

  // === Cart Logic ===
const addToCart = (product: Product) => {
  setCart((prevCart) => {
    // Find if the product already exists in the cart
    const existingItemIndex = prevCart.findIndex((item) => item.id === product.id)

    if (existingItemIndex !== -1) {
      // If product exists → update its quantity (no duplicate item)
      const updatedCart = [...prevCart]
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      }
      return updatedCart
    } else {
      // If new product → add it once with quantity 1
      return [{ ...product, quantity: 1 }, ...prevCart] as CartItem[]
    }
  })
}

const updateQuantity = (id: number, newQuantity: number) => {
  setCart((prevCart) => {
    // Remove if quantity is 0 or less
    if (newQuantity <= 0) {
      return prevCart.filter((item) => item.id !== id)
    }

    // Update existing product’s quantity (never duplicate)
    return prevCart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
  })
}


    // === Like Logic ===
    const toggleLike = (productId: number) => {
        setLikedIds((prevLikedIds) => {
            if (prevLikedIds.includes(productId)) {
                return prevLikedIds.filter((id) => id !== productId)
            } else {
                return [...prevLikedIds, productId]
            }
        })
    }

    // === Checkout Logic ===
    const handleCheckout = async () => {
        if (cart.length === 0) {
            console.warn("Your cart is empty!")
            return
        }

        try {
            const cartItemsToSend = cart.map(({ id, quantity }) => ({
                id,
                quantity
            }))
            const response = await fetch(`${API_BASE_URL}/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartItems: cartItemsToSend })
            })

            if (!response.ok) throw new Error("Checkout failed on the server.")

            const result = await response.json()
            console.log(`Checkout successful! Message: ${result.message}`)
            setCart([])
        } catch (err) {
            console.error("Checkout error:", err)
        }
    }

    const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0)

    const likedProducts = Array.isArray(products)
        ? products.filter((p) => likedIds.includes(p.id))
        : []

    if (loading)
        return (
            <div className="p-8 text-center text-xl">Loading products...</div>
        )

    if (error && products.length === 0)
        return (
            <div className="p-8 text-center text-red-600 font-bold">
                {error}
            </div>
        )

    return (
        <div className="min-h-screen bg-gradient-to-r from-violet-50 to-slate-400">
            <Navbar cartCount={totalItemsInCart} likedCount={likedIds.length}  />

            <div className="p-6 pt-24 container mx-auto">
                <Routes>
                    {/* Home Route */}
                    <Route
                        path="/"
                        element={
                            <Home
                                products={products}
                                likedIds={likedIds}
                                addToCart={addToCart}
                                toggleLike={toggleLike}
                            />
                        }
                    />

                    {/* Checkout Route */}
                    <Route
                        path="/checkout"
                        element={
                            <Checkout
                                cart={cart}
                                updateQuantity={updateQuantity}
                                handleCheckout={handleCheckout}
                            />
                        }
                    />

                    {/* Liked Products Route */}
                    <Route
                        path="/liked"
                        element={
                            <LikedProducts
                                products={likedProducts}
                                likedIds={likedIds}
                                addToCart={addToCart}
                                toggleLike={toggleLike}
                            />
                        }
                    />

                    {/* Home Route */}
                    <Route path="/payment" element={<Payment />} />
                </Routes>
                {/* Products payment Route */}
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default App
