import { Router } from "express";
import { config } from "../config/index.js";
import { v4 as uuidv4 } from 'uuid'
import { CartModel } from '../models/carts.model.js'
import { ProductModel } from "../models/products.model.js";
import { verifyExistence } from "../middlewares/verifyExistence.js";

export const CartsRouter = Router();

// Crear un Carrito 

CartsRouter.post('/', async (req, res) => {
    try {
        const cart = new CartModel({
            id: uuidv4()
        });
        await cart.save();
        res.send({ menssage: 'Carrito creado', cart })
    } catch (error) {
        res.status(500).send({ message: 'Error al crear elcarrito', error: error.message });


    }
})
// Obtener todos los carritos


CartsRouter.get('/', async (req, res) => {
    try {
        const carts = await CartModel.find({});
        res.send({ carts });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los carritos', error: error.message });
    }
});


// obtener carrito por id

CartsRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = await CartModel.findOne({ _id: req.params.cid });
        if (cartId) {
            res.send({ cartId });
        }
        else {
            res.status(404).send({ message: `Carrito con Id:${req.params.cid} no encontrado` })
        }
    } catch (error) {
        res.status(500).send({ menssage: 'Error al leer Carrito' })
    }
})

// agregar un producto a un carrito 


CartsRouter.post('/:cid/products/:pid', verifyExistence, async (req, res) => {

    let { cartId, productId, existingProduct } = req;
    try {
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            console.log('el producto a agregar es ', productId);
            cartId.products.push({ product: productId.id, quantity: 1 })
        }

        await cartId.save()
        res.send({ message: 'producto Agregado', cart: cartId })

    } catch (error) {
        res.status(500).send({ message: 'Error al agregar el producto al carrito', error: error.message });

    }
})


// Eliminar del carrito un producto seleccionado


CartsRouter.delete('/:cid/products/:pid',verifyExistence, async (req, res) => {

    let { cartId, productId, existingProduct } = req;

    try {
       
        await CartModel.updateOne(
            { _id: cartId._id },
            { $pull: { products: { product: productId._id} } },

        );

        const updatedCart = await CartModel.findById(cartId._id)

        res.send({ message: 'Producto eliminado', cart: updatedCart })

    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto del carrito', error: error.message });
    }
})

// Actualizar todos los productos del carrito con un arreglo de productos

CartsRouter.post('/:cid', async (req, res) => {
    try {
        const cartId = await CartModel.findByIdAndUpdate(req.params.cid, req.body, { new: true, upsert: false });
        if (cartId) {

            res.send({ message: 'Carrito actualizado', cart: cartId });
        }
        else {
            res.status(404).send({ message: `Carrito con Id:${req.params.cid} no encontrado` })
        }
    } catch (error) {
        res.status(500).send({ menssage: 'Error al leer Carrito' })
    }
})

// Actualizar solo la cantidad de ejemplares del producto por cualquier cantidad pasada por req.body

CartsRouter.put('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const { quantity } = req.body;
    try {
        let cartId = await CartModel.findById(cid);
        if (!cartId) {
            return res.status(404).send({ menssage: `Carrito con id ${cid} no encontrado` })
        }
        let productId = await ProductModel.findById(pid)
        if (!productId) {
            return res.status(404).send({ menssage: `Producto con id ${pid} no encontrado` })
        }
        const existingProduct = cartId.products.findIndex((prod) => prod.product.equals(pid));

        if (existingProduct === -1) {
            return res.status(404).send({ message: `Producto con id ${pid} no se encuentra en el carrito` })
        }
        cartId.products[existingProduct].quantity = quantity;


        await cartId.save()



        const updatedCart = await CartModel.findById(cid).populate('products.product');

        res.send({ message: 'Cantidad actualizada ', cart: updatedCart })

    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la cantida del producto', error: error.message });
    }
})

// Eliminar un carrito por Id

// No uso en este caso el middlewares- verifyExistence para que me queden las dos formas de realizar la misma tarea

CartsRouter.delete('/:cid', async (req, res) => {
    try {
        const cartId = await CartModel.findByIdAndDelete(req.params.cid);
        if (cartId) {
            res.send({ message: 'Carrito eliminado' })
        }
        else {
            res.status(404).send({ message: `Carrito con Id:${req.params.cid} no encontrado` })
        }
    } catch (error) {
        res.status(500).send({ menssage: 'Error al borrar el  Carrito' })
    }
})