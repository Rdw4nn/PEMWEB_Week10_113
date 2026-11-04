import express from "express";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Middleware parsing Body Request JSON & URL Encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file statis dari folder public
app.use(express.static("public"));

// Mounting Router
app.use("/api/products", productRoutes);

export default app;