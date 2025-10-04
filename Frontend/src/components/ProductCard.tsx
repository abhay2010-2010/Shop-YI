import { Heart, ShoppingCart, Star, TrendingUp } from "lucide-react"
import { useState } from "react"

import type { Product } from "../types"

interface Props {
    product: Product
    addToCart: (product: Product) => void
}

function ProductCard({ product, addToCart }: Props) {
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = () => {
        setIsAdding(true)
        addToCart(product)
        setTimeout(() => setIsAdding(false), 600)
    }

    // Mock rating (you can add this to your Product type)
    const rating = 4.3
    const reviews = 1245
    const discount = 15 // percentage

    return (
        <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{discount}% OFF</span>
                </div>
            )}

            {/* Wishlist Button */}
            <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                <Heart
                    className={`w-5 h-5 transition-colors duration-300 ${
                        isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                    }`}
                />
            </button>

            {/* Product Image Container */}
            <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        Quick View
                    </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3">
                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                        <span>{rating}</span>
                        <Star className="w-3 h-3 fill-white" />
                    </div>
                    <span className="text-xs text-gray-500">
                        ({reviews.toLocaleString()})
                    </span>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                    </span>
                    {discount > 0 && (
                        <>
                            <span className="text-sm text-gray-400 line-through">
                                $
                                {(product.price * (1 + discount / 100)).toFixed(
                                    2
                                )}
                            </span>
                            <span className="text-sm text-green-600 font-semibold">
                                {discount}% off
                            </span>
                        </>
                    )}
                </div>

                {/* Delivery Info */}
                <p className="text-xs text-gray-600">
                    Free delivery by{" "}
                    <span className="font-semibold">Tomorrow</span>
                </p>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isAdding
                            ? "bg-green-600 scale-95"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                    }`}>
                    {isAdding ? (
                        <>
                            <span className="animate-bounce">✓</span>
                            <span>Added!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                        </>
                    )}
                </button>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    )
}

export default ProductCard
