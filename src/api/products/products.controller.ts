import { Request, RequestHandler, Response } from "express";
import { ApiResponse } from "../models/api-response.model";
import { NotFoundError } from "../models/custom-error.model";
import {
  IProduct,
  IGetProductReq,
  IAddProductReq,
  IUpdateProductReq,
  IDeleteProductReq,
} from "./products.model";

const PRODUCTS: IProduct[] = [
  { id: 1, name: "Real Madrid", league: "La Liga", isActive: true },
  { id: 2, name: "Barcelona", league: "La Liga", isActive: true },
  {
    id: 3,
    name: "Manchester United",
    league: "Premier League",
    isActive: true,
  },
  { id: 4, name: "Liverpool", league: "Premier League", isActive: true },
  { id: 5, name: "Arsenal", league: "Premier League", isActive: true },
  { id: 6, name: "Inter", league: "Serie A", isActive: true },
  { id: 7, name: "Milan", league: "Serie A", isActive: true },
  { id: 8, name: "Juventus", league: "Serie A", isActive: true },
];

export const getProducts = (req: Request, res: Response) => {
  const response = ApiResponse.successData(PRODUCTS);
  res.send(response);
};

/**
 * Get active Product records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getActiveProducts: RequestHandler = (
  req: Request,
  res: Response
) => {
  const activeProducts = PRODUCTS.filter((product) => product.isActive);
  const response = ApiResponse.successData(activeProducts);
  res.send(response);
};

/**
 * Get Product record based on id provided
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const getProductById: RequestHandler = (
  req: IGetProductReq,
  res: Response
) => {
  const product = PRODUCTS.find(
    (product) => product.id === +req.params.id && product.isActive
  );
  if (!product) {
    throw new NotFoundError("Product not found");
  }
  const response = ApiResponse.successData(product);
  res.send(response);
};

/**
 * Inserts a new Product record based
 *
 * @param req Express Request
 * @param res Express Response
 */
export const addProduct: RequestHandler = (
  req: IAddProductReq,
  res: Response
) => {
  const lastProductIndex = PRODUCTS.length - 1;
  const lastId = PRODUCTS[lastProductIndex].id;
  const id = lastId + 1;
  const newProduct: IProduct = {
    ...req.body,
    id,
    isActive: true,
  };

  PRODUCTS.push(newProduct);

  res.send(newProduct);
};

/**
 * Updates existing Product record
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const updateProductById: RequestHandler = (
  req: IUpdateProductReq,
  res: Response
) => {
  const currentProduct = PRODUCTS.find(
    (product) => product.id === +req.params.id && product.isActive
  );
  currentProduct.name = req.body.name || currentProduct.name;
  currentProduct.league = req.body.league || currentProduct.league;

  res.send({ success: true });
};

/**
 * deletes a Product
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const deleteProductById: RequestHandler = (
  req: IDeleteProductReq,
  res: Response
) => {
  const productIndex = PRODUCTS.findIndex(
    (product) => product.id === +req.params.id && product.isActive
  );
  PRODUCTS.splice(productIndex, 1);

  res.send({ success: true });
};
