import { Request } from "express";

interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  reviews: IReview[];
}

interface ICategory {
  id: number;
  name: string;
}

interface IReview {
  id: number;
  userName: string;
  rating: number;
  time: string;
  text: string;
}

interface IGetProductReq extends Request<{ id: IProduct["id"] }> {}
interface IAddProductReq extends Request {}
interface IUpdateProductReq
  extends Request<{ id: IProduct["id"] }, any, IProduct> {}
interface IDeleteProductReq extends Request<{ id: IProduct["id"] }> {}

export {
  IProduct, ICategory, IReview,
  IGetProductReq,
  IAddProductReq,
  IUpdateProductReq,
  IDeleteProductReq,
};
