import React from 'react'

import ProductCard from '../components/ProductCard'
import type { Product } from '../types'

interface HomeProps {
  products: Product[]
  likedIds: number[] 
  addToCart: (product: Product) => void
  toggleLike: (productId: number) => void 
}

const Home: React.FC<HomeProps> = ({ products, likedIds, addToCart, toggleLike }) => {

    console.log("hjbiwxiw",products)
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Products</h1>
      
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
    </>
  )
}

export default Home
