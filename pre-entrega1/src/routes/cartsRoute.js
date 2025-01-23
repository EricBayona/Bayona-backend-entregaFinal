import { Router } from "express";
import fs from 'fs';
import path from "path";
import { config } from "../config/index.js";
import { v4 as uuidv4 } from 'uuid'

export const CartsRouter = Router();

const pathToCarts = path.join(config.dirname, '/src/data/carts.json');
const pathToProducts = path.join(config.dirname, '/src/data/products.json');


CartsRouter.post('/', async (req, res) => {
    let cartsString = await fs.promises.readFile(pathToCarts, 'utf-8');
    const carts = JSON.parse(cartsString);

    const id = uuidv4();
    const product = []

    const cart = {
        id,
        product
    }

    carts.push(cart)
    const cartsStrigified = JSON.stringify(carts, null, '\t');
    await fs.promises.writeFile(pathToCarts, cartsStrigified);
    res.send({ message: 'carrito creado', data: cart })
})


CartsRouter.get('/:cid', async (req, res) => {
    try {
        let cartsString = await fs.promises.readFile(pathToCarts, 'utf-8');
        const carts = JSON.parse(cartsString);

        let cid = req.params.cid;
        let cartId = carts.find(c => c.id === cid);

        if (!cartId) {
            res.status(400).send({ message: `Carrito con Id:${cid} no encontrado` })
        }
        res.send({ product: cartId.product })
    } catch (error) {
        res.status(500).send({ menssage: 'Error al leer Carrito' })
    }
})



CartsRouter.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    try {
        let cartsString = await fs.promises.readFile(pathToCarts, 'utf-8');
        const carts = JSON.parse(cartsString);
        let cartId = carts.find(c => c.id === cid);

        let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
        const products = JSON.parse(productsString);
        let productId = products.find(p => p.id === pid)

        if (!cartId || !productId) {
            res.status(400).send({ message: `Carrito con Id:${cid} no encontrado` })
        }

        const existingProduct = cartId.product.find(p=>p.id ===pid);
        if(existingProduct){
            existingProduct.quantity +=1;
        }else{
            cartId.product.push({ id: productId.id, quantity:1 })

        }

        const cartsStrigified = JSON.stringify(carts, null, '\t');
        await fs.promises.writeFile(pathToCarts, cartsStrigified);
        res.send({ message: 'producto Agregado', data: carts })
    } catch (error) {
    }
})
