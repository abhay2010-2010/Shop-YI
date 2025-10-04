import express from "express";
import { getProducts } from "../controllers/product.js";

const productrouter = express.Router();


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Returns a hardcoded list of products.
 *     responses:
 *       200:
 *         description: List of products
 */
productrouter.get("/", getProducts);


export default productrouter;