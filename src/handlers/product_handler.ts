import express, { Application, Request, Response } from "express";
import { Product, Products } from "../models/product";

const products = new Products();

const index = async (req: Request, res: Response) => {
  const productsReslults = await products.index();
  res.json(productsReslults);
};

const show = async (req: Request, res: Response) => {
  const product = await products.show(req.params.id)
  res.json(product)
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
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await products.delete(req.body.id)
  res.json(deleted)
}

const productsRoutes = (app: Application) => {
  app.get("/products", index)
  app.get('/products/:id', show)
  app.post('/products', create)
  app.delete('/products/:id', destroy)
};

export default productsRoutes;
