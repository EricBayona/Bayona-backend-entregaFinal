import express from 'express';
import { ProductsRouter } from '../routes/productsRoute.js';
import { CartsRouter } from '../routes/cartsRoute.js';


const initApp = ()=>{
    const app =express();

//Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use('/api/products', ProductsRouter)
    app.use('/api/carts', CartsRouter)
    
    return app;
}



export default initApp 