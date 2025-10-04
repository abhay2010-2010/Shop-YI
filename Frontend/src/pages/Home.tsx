import axios from "axios"
import { useEffect, useState } from "react"

import ProductCard from "../components/ProductCard"
import type { CartItem, Product } from "../types"

function Home() {
    const [products, setProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<CartItem[]>(() => {
        return JSON.parse(localStorage.getItem("cart") || "[]")
    })

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/products")
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id)
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home
