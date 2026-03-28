const router = require("express").Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const { productValidation } = require("../middlewares/validatorMiddleware");
const upload = require('../middlewares/uploadMiddleware');
const {
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productsControllers");

router.get("/", getAllProducts);
router.get("/:id", getProductByID);

router.post("/", protect, authorize('admin'), productValidation(), createProduct);
router.put("/:id", protect, authorize('admin'), productValidation(), updateProduct);
router.delete("/:id", protect, authorize('admin'), deleteProduct);

router.post("/", protect, authorize('admin'), upload.single('image'), productValidation, createProduct);

module.exports = router;