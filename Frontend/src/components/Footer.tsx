import React from "react";

const Footer: React.FC = () => (
    <footer style={{
        background: "rgba(98, 186, 227, 1)",
        color: "#fff",
        padding: "5px 0",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        left: 0
    }}>
        <div>
            <strong>ShopEase</strong> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
        </div>
        <div style={{ marginTop: "8px", fontSize: "0.95em" }}>
            <a href="/privacy" style={{ color: "#fff", margin: "0 10px", textDecoration: "underline" }}>Privacy Policy</a>
            <a href="/terms" style={{ color: "#fff", margin: "0 10px", textDecoration: "underline" }}>Terms of Service</a>
            <a href="/contact" style={{ color: "#fff", margin: "0 10px", textDecoration: "underline" }}>Contact Us</a>
        </div>
    </footer>
);

export default Footer;