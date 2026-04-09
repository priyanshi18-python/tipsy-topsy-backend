import express from "express";
import {
  createProductController,
  getLatestProductsController
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", createProductController);
router.get("/latest", getLatestProductsController);

export default router;