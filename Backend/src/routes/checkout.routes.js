import express from "express";
import { checkout } from "../controllers/checkout.js";
const checkoutrouter = express.Router();

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Checkout cart
 *     description: Accepts cart items and logs order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: number
 *                 quantity:
 *                   type: number
 *     responses:
 *       200:
 *         description: Checkout successful
 */
checkoutrouter.post("/", checkout);

export default checkoutrouter;