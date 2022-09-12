import { Router } from "express";
import * as Controller from "./products.controller";
import * as Auth from "./../middlewares/auth.middleware";

const router = Router();

router
  .route("/")
  .get(Controller.getProducts)
  .post(Controller.addProduct);

router
  .route("/:id")
  .get(Controller.getProductById)
  .patch(Controller.updateProductById)
  .delete(Controller.deleteProductById);

export default router;
