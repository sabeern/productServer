const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const tokenValidation = require("../config/tokenValidation");

router.post(
  "/addProduct",
  tokenValidation.validateToken,
  productController.addProduct
);
router.get(
  "/getProduct",
  tokenValidation.validateToken,
  productController.getProduct
);
router.post(
  "/deleteProduct",
  tokenValidation.validateToken,
  productController.deleteProduct
);

module.exports = router;
