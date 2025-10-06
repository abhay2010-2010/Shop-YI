import express from "express";
import { checkout } from "../controllers/checkout.js";
const checkoutrouter = express.Router();

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Checkout cart
 *     description: Accepts cart items and processes an order checkout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       200:
 *         description: Checkout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Checkout successful
 */


checkoutrouter.post("/", checkout);

export default checkoutrouter;