import { Request } from "express";

interface IProduct {
  id: number;
  name: string;
  league: string;
  isActive: boolean;
}

interface IGetProductReq extends Request<{ id: IProduct["id"] }> {}
interface IAddProductReq extends Request {}
interface IUpdateProductReq
  extends Request<{ id: IProduct["id"] }, any, IProduct> {}
interface IDeleteProductReq extends Request<{ id: IProduct["id"] }> {}

export {
  IProduct,
  IGetProductReq,
  IAddProductReq,
  IUpdateProductReq,
  IDeleteProductReq,
};
