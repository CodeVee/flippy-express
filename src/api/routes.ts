import { Router } from 'express';
import ProductsRoutes from './products/products.routes';

const router = Router();
router.use('/products', ProductsRoutes);

export default router;
