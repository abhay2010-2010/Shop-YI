import { Route, Routes } from "react-router-dom"

import "./App.css"

import Navbar from "./components/Navbar"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
