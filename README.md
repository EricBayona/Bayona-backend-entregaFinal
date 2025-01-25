# Bayona-backend-primera-entrega

Este es el proyecto de backend de la primera entrega. Se trata de una API RESTful que gestiona productos y usuarios.

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

```bash
# Clona el repositorio
git clone https://github.com/EricBayona/Bayona-backend-primera-entrega.git
cd pre-entrega1

# Instala las dependencias
npm install

Para ejecutar la aplicación, utiliza el siguiente comando:
cd src
node server.js

Endpoints Productos

GET http://localhost:8080/api/products/  : Obtiene la lista de productos.

POST http://localhost:8080/api/products/ :Crea un nuevo producto.

el producto debe tener la siguiente caracteristica:
{
      "title": "Bici3",
      "description": "Descripción del nuevo producto",
      "code": "NP001",
      "price": 10,
      "status": "available",
      "stock": 20,
      "category": "categoria1",
      "thumbnails": [
        "url1",
        "url2"
      ]
    }
TODOS LOS CAMPOS SON OBLIGATORIOS PARA CREAR EL PRODUCTO!!!

GET http://localhost:8080/api/products/:id   : Obtiene un producto por su ID.

PUT http://localhost:8080/api/products/:id: Actualiza un producto por su ID.

DELETE /http://localhost:8080/api/products/:id: Elimina un producto por su ID.


Endpoints Carts


POST http://localhost:8080/api/carts  : Crea un nuevo carrito.

GET http://localhost:8080/api/carts:id: Obtiene un carrito por su ID.

POST http://localhost:8080/:cid/product/:pid: Agrega un producto al carrito seleccionado.

(cid: id del carrito; pid: id del producto seleccionado)
