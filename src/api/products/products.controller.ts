import { Request, RequestHandler, Response } from "express";
import { ApiResponse } from "../models/api-response.model";
import { NotFoundError } from "../models/custom-error.model";
import {
  IProduct,
  IGetProductReq,
  IAddProductReq,
  IUpdateProductReq,
  IDeleteProductReq,
  ICategory,
  IReview,
} from "./products.model";

const review =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
const REVIEWS: IReview[] = [
  {
    id: 1,
    userName: "Debra R. Estep",
    rating: 5,
    time: "1 day ago",
    text: review,
  },
  {
    id: 2,
    userName: "Michell N. Morgan",
    rating: 4,
    time: "2 day ago",
    text: review,
  },
];

const description = `Lorem Ipsum is simply dummy text of the printing and 
typesetting industry. Lorem Ipsum has been the 
industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and 
scrambled it to make a type specimen book. \n\n
Lorem Ipsum is simply dummy text of the printing and 
typesetting industry. Lorem Ipsum has been the 
industry's standard dummy text ever.`;
const PRODUCTS: IProduct[] = [
  { id: 1, name: "Oranges", price: 1400, description, category: 'Fruits', reviews: REVIEWS },
  { id: 2, name: "Cucumber", price: 1400, description, category: 'Fruits', reviews: REVIEWS  },
  { id: 3, name: "Avocado", price: 1400, description, category: 'Fruits', reviews: REVIEWS },
  { id: 4, name: "Brocoli", price: 1400, description, category: 'Vegetables', reviews: REVIEWS  },
  { id: 5, name: "Lettuce", price: 1400, description, category: 'Vegetables', reviews: REVIEWS  },
  { id: 6, name: "Water Melon", price: 1400, description, category: 'Fruits', reviews: REVIEWS  },
  { id: 7, name: "Mangoes", price: 1400, description, category: 'Fruits', reviews: REVIEWS  },
  { id: 8, name: "Tomatoes", price: 1400, description, category: 'Vegetables', reviews: REVIEWS  },
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
  const activeProducts = PRODUCTS;
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
    (product) => product.id === +req.params.id
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
    (product) => product.id === +req.params.id
  );

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
    (product) => product.id === +req.params.id
  );
  PRODUCTS.splice(productIndex, 1);

  res.send({ success: true });
};
