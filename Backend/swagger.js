import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shopping Cart API",
      version: "1.0.0",
      description: "Simple API for products and checkout",
    },
    servers: [{ url: `http://localhost:5001` }], // ✅ http, not https
  },
  apis: ["./src/routes/*.js"], // ✅ Corrected path
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
