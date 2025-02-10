import { Router } from "express";
import fs from 'fs';
import path from "path";
import { config } from "../config/index.js";
import { v4 as uuidv4 } from 'uuid';
import { validateInputProducts } from "../middlewares/validationProducts.js";

export const ProductsRouter = Router();

const pathToProducts = path.join(config.dirname, '/src/data/products.json');

console.log(pathToProducts);

ProductsRouter.get('/', async (req,res)=>{
    let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
    const products = JSON.parse(productsString)
    
    res.send({products})
})

ProductsRouter.get('/:pid', async(req, res)=>{
    try{
        let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
        const products = JSON.parse(productsString);

        let pid= req.params.pid;
        let productId = products.find(p=> p.id === pid)

        if(productId){
            res.send({product: productId}) 
        }else{
            res.status(404).send({menssage : 'Producto no encontrado'})
        }
    }
    catch(error){
        res.status(500).send({ menssage : 'Error al leer los productos'})

    }
})

ProductsRouter.post('/', validateInputProducts, async (req,res)=>{
    let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
    const products = JSON.parse(productsString);

    const id = uuidv4() // id autogenerado por uuid
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      } = req.body
    
      const product = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      }
    
      products.push(product)
    
      const productsStringified = JSON.stringify(products, null, '\t')
      await fs.promises.writeFile(pathToProducts, productsStringified)
      res.send({ message: 'Producto creado', data: product })
    
})

ProductsRouter.put('/:pid',async(req,res)=>{
    try {
        let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
        let products = JSON.parse(productsString);

        let pid= req.params.pid;
        const update = req.body;        

        let productToUpdate = products.find (p=> p.id === pid)

        if(!productToUpdate){
            res.status(400).send({ message: `no se encontro el producto con id:${pid}`})
        }

        products = products.map(product=>{
            if (product.id === pid){
                return{ ...product, ...update, id: product.id}
            }else return product
        })
        
        const productsStringified = JSON.stringify(products, null, '\t');
        await fs.promises.writeFile(pathToProducts, productsStringified);
        
        res.send({ mensaje: `Se actualizó el product con id: ${pid}` })

    } catch (error) {
         console.error("Error al actualizar el producto:", error);
        res.status(500).send({ message: 'Error al actualizar el producto' });
    }
})

ProductsRouter.delete('/:pid', async(req,res)=>{
    
    const pid= req.params.pid;

    try {
        let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
        let products = JSON.parse(productsString);

        let productDelete = products.find(p=>p.id == pid)

        if(!productDelete){
            res.status(400).send({ message: `no se encontro el producto con id:${pid}`})
        }

        products = products.filter(product => product.id !== pid);

        const productsStringified = JSON.stringify(products, null , '\t');
        await fs.promises.writeFile(pathToProducts, productsStringified);

        res.send({ message: `Se eliminó el producto con ID: ${pid}` });
        

    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send({ message: 'Error al eliminar el producto' });
    }
})