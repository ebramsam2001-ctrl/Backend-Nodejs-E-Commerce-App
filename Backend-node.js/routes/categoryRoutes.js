const router = require("express").Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const { categoryValidation } = require("../middlewares/validatorMiddleware");
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryControllers");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.post("/", protect, authorize('admin'), categoryValidation(), createCategory);
router.put("/:id", protect, authorize('admin'), categoryValidation(), updateCategory);
router.delete("/:id", protect, authorize('admin'), deleteCategory);

module.exports = router;