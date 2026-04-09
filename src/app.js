
import express from "express";
import cors from "cors";

// routes
import productRoutes from "./routes/product.routes.js";

const app = express(); // ✅ IMPORTANT

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// export
export default app; // ✅ MUST