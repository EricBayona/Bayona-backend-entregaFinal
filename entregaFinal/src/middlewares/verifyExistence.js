export const verifyExistence = async(req, res, next) => {
    let cid = req.params.cid;
    let pid = req.params.pid
    try {
        let cartId = await CartModel.findById(cid);
        if (!cartId) {
            return res.status(404).send({ menssage: `Carrito con id ${cid} no encontrado` })
        }
        let productId = await ProductModel.findById(pid)
        if (!productId) {
            return res.status(404).send({ menssage: `Producto con id ${pid} no encontrado` })
        }
        console.log('cartId: ', cartId)

        const existingProduct = cartId.products.find((prod) => prod.product.equals(pid));

        req.existingProduct = existingProduct;
        req.cartId=cartId;
        req.productId = productId;

        console.log('CartId:', cartId);
        console.log('ProductId:', productId);
        console.log('ExistingProduct:', existingProduct);

    }catch(error){
        res.status(500).send({ message: 'Error al leer Carrito o Producto', error: error.message });

    }
    next()
}