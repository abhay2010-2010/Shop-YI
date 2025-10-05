import products from "../data/product.js";

export const checkout = (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ success: false, message: "Invalid cart data" });
  }

  // Calculate total
  let total = 0;
  items.forEach(({ id, quantity }) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      total += product.price * quantity;
    }
  });
  

  console.log("🛒 New Order:", items);

  res.json({
    success: true,
    message: "Order placed successfully",
    total,
  });
};
