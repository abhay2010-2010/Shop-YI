import ProductCard from "../components/ProductCard"
import Loading from "../logo/Loading"
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
    // const [searchTerm, setSearchTerm] = useState("")

    // // Filter products based on search
    // const filteredProducts = products.filter((p) =>
    //   p.name.toLowerCase().includes(searchTerm.toLowerCase())
    // )
    if (products.length === 0) return <Loading />

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
                    Available Products
                </h1>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-gray-600 mt-10">
                    No products found matching .
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
        </>
    )
}

export default Home
