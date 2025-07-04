const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory product storage
let products = [];

// Generate random ID for products
const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Validate stock status
const isValidStockStatus = (status) => {
  const validStatuses = ["in-stock", "low-stock", "out-of-stock"];
  return validStatuses.includes(status);
};

// GET /products - Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET /products/:id - Get product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res
      .status(404)
      .json({ error: `Product with ID ${req.params.id} not found` });
  }
  res.json(product);
});

// POST /products - Add new product
app.post("/products", (req, res) => {
  const { productName, cost, stockStatus } = req.body;

  // Validate required fields
  if (!productName || cost === undefined || !stockStatus) {
    return res
      .status(400)
      .json({ error: "productName, cost, and stockStatus are required" });
  }

  // Validate stock status
  if (!isValidStockStatus(stockStatus)) {
    return res.status(400).json({ error: "Invalid stock status" });
  }

  const newProduct = {
    id: generateId(),
    productName,
    cost,
    stockStatus,
    createdAt: new Date(),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PATCH /products/:id - Edit product properties (except stock status)
app.patch("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res
      .status(404)
      .json({ error: `Product with ID ${req.params.id} not found` });
  }

  const { productName, cost } = req.body;

  // Update only provided fields
  if (productName !== undefined) product.productName = productName;
  if (cost !== undefined) product.cost = cost;

  res.json(product);
});

// PATCH /products/:id/:status - Update stock status only
app.patch("/products/:id/:status", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res
      .status(404)
      .json({ error: `Product with ID ${req.params.id} not found` });
  }

  const newStatus = req.params.status;
  if (!isValidStockStatus(newStatus)) {
    return res.status(400).json({ error: "Invalid stock status" });
  }

  product.stockStatus = newStatus;
  res.json(product);
});

// DELETE /products/:id - Delete product by ID
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res
      .status(404)
      .json({ error: `Product with ID ${req.params.id} not found` });
  }

  const deletedProduct = products.splice(index, 1)[0];
  res.json(deletedProduct);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
