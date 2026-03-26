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

// مسارات عامة (للجميع)
router.get("/", getAllProducts);
router.get("/:id", getProductByID);

// مسارات محمية (للمسجلين فقط - Admin)
router.post("/", protect, authorize('admin'), productValidation(), createProduct);
router.put("/:id", protect, authorize('admin'), productValidation(), updateProduct);
router.delete("/:id", protect, authorize('admin'), deleteProduct);

// file uplode
// router.post("/", protect, authorize('admin'), upload.single('image'), productValidation, createProduct);

module.exports = router;