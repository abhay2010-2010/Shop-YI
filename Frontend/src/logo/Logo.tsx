import { ShoppingBag } from "lucide-react"

function Logo() {
    return (
        <div className="flex items-center space-x-2 cursor-pointer group">
            {/* Animated Shopping Bag Icon */}
            <div className="relative">
                {/* Icon remains visible using a dark color */}
                <ShoppingBag className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 group-hover:animate-bounce" />
                {/* The ping and dot provide a visual alert/accent */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </div>

            {/* Animated Text */}
            <div className="relative overflow-hidden">
                <h1 className="text-3xl font-bold">
                    {/* Modified gradient to be visible on white background.
              Uses gray-700 to provide contrast while maintaining a subtle, vibrant effect via purple-600. */}
                    <span className="inline-block bg-gradient-to-r from-gray-700 via-purple-600 to-gray-700 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                        Shop
                    </span>
                    <span className="inline-block text-blue-600 group-hover:animate-pulse">
                        YI
                    </span>
                </h1>

                {/* Underline Animation */}
                <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Inline styles for the animation keyframes */}
            <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
        </div>
    )
}

export default Logo
