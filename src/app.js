
import express from "express";
import cors from "cors";

// routes
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express(); // ✅ IMPORTANT

// middlewares
app.use(cors({
  origin: 'http://localhost:3001',
  credentials:true,
}));
app.use(express.json());

// routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

// test route
app.get("/", (req, res) => {
  res.send("backend running 🚀");
});

// export
export default app; // ✅ MUST