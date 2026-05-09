const router = require("express").Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const { Validation } = require("../middlewares/validatorMiddleware");
const categoryValidationSchema = require("../validators/categoryValidation");

const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryControllers");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.post("/", protect, authorize('admin'), Validation(categoryValidationSchema), createCategory);
router.put("/:id", protect, authorize('admin'), Validation(categoryValidationSchema), updateCategory);
router.delete("/:id", protect, authorize('admin'), deleteCategory);

module.exports = router;