import express from "express";
import {
  createCategoryController,
  getAllCategoriesController
} from "../controllers/category.controller.js";

const router = express.Router();

// POST /api/categories/create  → Nayi category banao
router.post("/create", createCategoryController);

// GET  /api/categories/all     → Saari categories lao
router.get("/allcategory", getAllCategoriesController);

export default router;