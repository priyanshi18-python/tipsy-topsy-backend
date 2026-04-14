import express from "express";
import {
  createProductController,
  getLatestProductsController,
  updateProductController,
  deleteProductController
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", createProductController);
router.get("/latest", getLatestProductsController);
router.put("/update/:id", updateProductController);
router.delete("/delete/:id", deleteProductController);

export default router;