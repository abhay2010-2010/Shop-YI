import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

import { swaggerUi, swaggerSpec } from "./swagger.js";
import productrouter from "./src/routes/product.routes.js";
import checkoutrouter from "./src/routes/checkout.routes.js";



const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

//api testing with swagger
app.use("/api-docs",swaggerUi.serve , swaggerUi.setup(swaggerSpec));//

app.get('/', (req, res) => {
  res.send('server is running properly');
});

app.use("/api/products",productrouter);
app.use("/api/checkout",checkoutrouter );

app.listen(port, async() => {
  try {
 console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📖 Swagger docs at http://localhost:5001/api-docs`);
  } catch (error) {
   console.log(error); 
  }
});