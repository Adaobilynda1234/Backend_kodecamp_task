# Product API

API for managing products with CRUD operations.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server

## Endpoints

- GET /products - List all products
- GET /products/:id - Get product by ID
- POST /products - Create new product
- PATCH /products/:id - Update product details
- PATCH /products/:id/:status - Update product stock status
- DELETE /products/:id - Delete product

## Example Usage

```bash
# Get all products
curl http://localhost:3000/products

# Add new product
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"productName":"Apples","cost":2.99,"stockStatus":"in-stock"}'

# Get product by ID
curl http://localhost:3000/products/123

# Update product
curl -X PATCH http://localhost:3000/products/123 -H "Content-Type: application/json" -d '{"productName":"Green Apples","cost":3.49}'

# Update stock status
curl -X PATCH http://localhost:3000/products/123/low-stock

# Delete product
curl -X DELETE http://localhost:3000/products/123
```
