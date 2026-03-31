const router = require("express").Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const { Validation } = require("../middlewares/validatorMiddleware");
const productValidationSchema = require("../validators/productValidation");

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

router.post("/", protect, authorize('admin'), Validation(productValidationSchema), createProduct);
router.put("/:id", protect, authorize('admin'), Validation(productValidationSchema), updateProduct);
router.delete("/:id", protect, authorize('admin'), deleteProduct);

router.post("/", protect, authorize('admin'), upload.single('image'), Validation(productValidationSchema), createProduct);

module.exports = router;