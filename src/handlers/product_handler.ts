import express, { Application, Request, Response } from "express";
import { verifyAuthToken } from "../middleware/verify_token";
import { Product, Products } from "../models/product";

const products = new Products();

const index = async (req: Request, res: Response) => {
  try {
    const productsReslults = await products.index();
    res.json(productsReslults);

  } catch (error) {
    res.status(400).json(error)

  }
};

const show = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error('Product id is required')
    }
    const product = await products.show(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    }
    const newproduct = await products.create(product)
    res.json(newproduct)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error('Product id is required')
    }
    const deleted = await products.delete(req.params.id)
    res.json(deleted)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

const productsRoutes = (app: Application) => {
  app.get("/products", index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
  app.delete('/products/:id', verifyAuthToken, destroy)
};

export default productsRoutes;
