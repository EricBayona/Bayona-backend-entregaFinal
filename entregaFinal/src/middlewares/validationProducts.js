export const validateInputProducts =(req, res, next)=>{
    const {
        title,
        description,
        code,
        price,
        available,
        stock,
        category,
        thumbnails,
      } = req.body

      if(!title || !description || !code || !price || !available|| !stock || !category || !thumbnails){
        return res.status(400).send({ message: "Todos los campos son obligatorios"})
      }
      if(price <= 0 || typeof price != 'number' ){
        return res.status(400).send({ message: " El precio debe ser un numero y no puede ser menor o igual a cero"})
      }
      if(stock <= 0 || typeof stock != 'number' ){
        return res.status(400).send({ message: " El stock no puede ser negativo y debe ser un numero"})
      }
    
    next();
}