import React from "react"
import { Link } from "react-router-dom"

import Logo from "../logo/Logo"

interface NavbarProps {
    cartCount: number
    likedCount: number // Explicitly typed
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, likedCount }) => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md z-10">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link
                    to="/" // Link to Home page
                    // Replaced the text link with the new Logo component
                    className="transition">
                    <Logo />
                </Link>

                <div className="flex space-x-4">
                    {/* LIKED BUTTON (Links to /liked route) */}
                    <Link
                        to="/liked"
                        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150"
                        aria-label="View liked products">
                        {/* Heart Icon SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-500">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>

                        {/* Liked Item Count Badge */}
                        {likedCount > 0 && (
                            <span
                                className="absolute top-0 right-0 
                             transform translate-x-1/4 -translate-y-1/4 
                             bg-red-600 text-white text-xs font-bold 
                             rounded-full h-5 w-5 flex items-center justify-center">
                                {likedCount}
                            </span>
                        )}
                    </Link>

                    {/* CART BUTTON (Links to /checkout route) */}
                    <Link
                        to="/checkout"
                        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150"
                        aria-label="View shopping cart">
                        {/* Cart Icon SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-700">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.023.835l.938 6.878a.86.86 0 00.954.678h10.366c.49 0 .907-.37.957-.864l.983-8.855A1.157 1.157 0 0021.75 3H2.25zM12 20.25a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 20.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            />
                        </svg>

                        {/* Cart Item Count Badge */}
                        {cartCount > 0 && (
                            <span
                                className="absolute top-0 right-0 
                             transform translate-x-1/4 -translate-y-1/4 
                             bg-red-600 text-white text-xs font-bold 
                             rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar
