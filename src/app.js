
import express from "express";
import cors from "cors";

// routes
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express(); // ✅ IMPORTANT

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// export
export default app; // ✅ MUST