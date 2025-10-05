import React, { useState } from "react"
import ProductCard from "../components/ProductCard"
import type { Product } from "../types"

interface HomeProps {
  products: Product[]
  likedIds: number[]
  addToCart: (product: Product) => void
  toggleLike: (productId: number) => void
}

const Home: React.FC<HomeProps> = ({
  products,
  likedIds,
  addToCart,
  toggleLike
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Available Products
        </h1>

        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No products found matching "{searchTerm}".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
    </>
  )
}

export default Home
