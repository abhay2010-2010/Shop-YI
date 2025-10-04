import type { CartItem } from "../types"

interface Props {
    cart: CartItem[]
    updateQuantity: (id: number, quantity: number) => void
    removeFromCart: (id: number) => void
}

function Cart({ cart, updateQuantity, removeFromCart }: Props) {
    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center mb-4 border-b pb-2">
                            <span>{item.name}</span>
                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1
                                        )
                                    }
                                    className="px-2">
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1
                                        )
                                    }
                                    className="px-2">
                                    +
                                </button>
                                <span className="ml-4">
                                    ${item.price * item.quantity}
                                </span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-4 text-red-500">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3 className="font-bold">Total: ${total}</h3>
                </div>
            )}
        </div>
    )
}

export default Cart
