import React from "react"

import ProductCard from "../components/ProductCard"
import type { Product } from "../types"

interface LikedProductsProps {
    products: Product[]
    likedIds: number[]
    addToCart: (product: Product) => void
    toggleLike: (productId: number) => void
}

const LikedProducts: React.FC<LikedProductsProps> = ({
    products,
    likedIds,
    addToCart,
    toggleLike
}) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6 text-red-500 flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 mr-2 fill-current">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        fill="currentColor"
                    />
                </svg>
                Your Wishlist ({products.length})
            </h1>

            {products.length === 0 ? (
                <p className="text-gray-500 text-center py-20 bg-white rounded-xl shadow-lg text-xl">
                    You haven’t added any products to your wishlist yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                            isLiked={likedIds.includes(product.id)}
                            onToggleLike={toggleLike}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default LikedProducts
