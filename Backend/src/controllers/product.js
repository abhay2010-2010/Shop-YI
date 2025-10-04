import products from "../data/product.js";

export const getProducts = (req, res) => {
  res.json({ success: true, products });
};
