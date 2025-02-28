import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ProductModel } from '../models/products.model.js';
import { validateInputProducts } from '../middlewares/validationProducts.js';

export const ProductsRouter = Router();

// Obtener todos los productos

ProductsRouter.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query, category, available } = req.query;

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: {}
    };

    const searchQuery = query ? { title: new RegExp(query, 'i') } : {};

    if (category) {
        searchQuery.category = category;
    }
    if (available !== undefined) {
        searchQuery.available = available === 'true';
    }

    if (sort === 'asc') {
        options.sort = { price: 1 };
    } else if (sort == 'desc') {
        options.sort = { price: -1 };
    }


    try {
        const result = await ProductModel.paginate(searchQuery, options);
        res.send({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevPage ? `/api/products?limit=${limit}&page=${result.prevPage}` : null,
            nextLink: result.nextPage ? `/api/products?limit=${limit}&page=${result.nextPage}` : null
        });;
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al obtener los productos', error: error.message });
    }
});

// Obtener producto por ID
ProductsRouter.get('/:pid', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid);
        if (product) {
            res.send({ product });
        } else {
            res.status(404).send({ message: `Producto con ${req.params.pid}no encontrado` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el producto', error: error.message });
    }
});

// Crear nuevo producto
ProductsRouter.post('/', validateInputProducts, async (req, res) => {
    try {
        const product = new ProductModel({
            ...req.body,
            id: uuidv4(), // Generar un ID único
        });
        await product.save();
        res.send({ message: 'Producto creado', product });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el producto', error: error.message });
    }
});

// Actualizar producto por ID
ProductsRouter.put('/:pid', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        if (product) {
            res.send({ message: 'Producto actualizado', product });
        } else {
            res.status(404).send({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el producto', error: error.message });
    }
});

// Eliminar producto por ID
ProductsRouter.delete('/:pid', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.pid);
        if (product) {
            res.send({ message: 'Producto eliminado' });
        } else {
            res.status(404).send({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto', error: error.message });
    }
});
