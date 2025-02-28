# Bayona-backend-Entrega-Final

# E-Commerce API

## Descripción

Este proyecto consiste en una **API RESTful** para la gestión de un sistema de carrito de compras de una tienda en línea. La API permite a los usuarios gestionar productos, carritos y realizar diversas operaciones sobre ellos, como agregar productos al carrito, eliminar productos, actualizar cantidades y realizar búsquedas filtradas por diferentes criterios como categoría o disponibilidad.

## Funcionalidades principales

- **Gestión de productos**: 
  - Agregar, actualizar, eliminar y consultar productos.
  
- **Carrito de compras**: 
  - Los usuarios pueden crear, actualizar y eliminar carritos de compras.
  - Permite añadir productos y modificar las cantidades de los productos dentro del carrito.
  
- **Búsqueda y filtrado**: 
  - Los productos pueden ser filtrados por categoría, disponibilidad.
  - Ordenamiento por precio (ascendente o descendente).
  
- **Paginación**: 
  - La API soporta la paginación para consultas de productos, permitiendo un acceso eficiente a grandes cantidades de datos.

## Características adicionales

- **Referencias entre modelos**: 
  - El modelo de carrito almacena solo el ID de los productos.
  - Mediante el uso de `populate`, se obtienen los detalles completos de los productos asociados cuando se consulta el carrito.
  
- **Validaciones**: 
  - Se incluyen validaciones para asegurar que los productos existan y estén disponibles antes de realizar operaciones en el carrito.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para el desarrollo del servidor.
- **Express**: Framework para la creación de la API RESTful.
- **Mongoose**: ORM para interactuar con la base de datos MongoDB.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar productos y carritos.


## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

```bash
# Clona el repositorio
git clone https://github.com/EricBayona/Bayona-backend-entregaFinal.git
cd entregaFinal

# Instala las dependencias
npm install

Para ejecutar la aplicación, utiliza el siguiente comando:
cd src
node server.js

Endpoints Productos

GET http://localhost:3006/api/products/  : Obtiene la lista de productos. Puede recibir por query params un limit, una page , un sort y un query


POST http://localhost:3006/api/products/ :Crea un nuevo producto.

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

GET http://localhost:3006/api/products/:pid   : Obtiene un producto por su ID.

PUT http://localhost:3006/api/products/:pid: Actualiza un producto por su ID.

DELETE /http://localhost:3006/api/products/:pid: Elimina un producto por su ID.


Endpoints Carts


POST http://localhost:3006/api/carts  : Crea un nuevo carrito.

GET http://localhost:3006/api/carts : Obtiene todos los carritos.

GET http://localhost:3006/api/carts:cid : Obtiene un carrito por su ID.

POST http://localhost:3006/:cid/product/:pid  : Agrega un producto al carrito seleccionado.

Delete http://localhost:3006/:cid/product/:pid  : Eliminar del carrito un producto seleccionado

Post http://localhost:3006/:cid  : Actualizar todos los productos del carrito con un arreglo de productos

Put http://localhost:3006/:cid/product/:pid  : Actualizar solo la cantidad de ejemplares del producto por cualquier cantidad pasada por req.body

Delete http://localhost:3006/:cid : Eliminar un carrito por Id

(cid: id del carrito; pid: id del producto seleccionado)


## Postman Collections

Para realizar pruebas correspondientes con las colecciones de Postman, sigue estos pasos:

1. **Importar Colección**: Abre Postman y haz clic en `Import`.
2. **Seleccionar Archivo**: Selecciona el archivo `SolicitudesEntregaFinal.postman_collection.json` que está en la raíz de este repositorio.
3. **Realizar Pruebas**: La colección importada contendrá todas las solicitudes necesarias para realizar las pruebas.

Puedes encontrar la colección de Postman en el siguiente archivo: [SolicitudesEntregaFinal.postman_collection.json](./SolicitudesEntregaFinal.postman_collection.json)