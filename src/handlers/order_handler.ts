import express, { Application, Request, Response } from "express";
import { verifyAuthToken } from "../middleware/verify_token";
import { Order, Orders } from "../models/order";

const orders = new Orders();

const index = async (req: Request, res: Response) => {
  const ordersReslults = await orders.index();
  res.json(ordersReslults);
};

const show = async (req: Request, res: Response) => {
  const order = await orders.show(req.params.id)
  res.json(order)
}

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    }

    const neworder = await orders.create(order)
    res.json(neworder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await orders.delete(req.body.id)
  res.json(deleted)
}

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const order_id = parseInt(req.body.order_id)
    const product_id = parseInt(req.body.product_id as string)
    const quantity = parseInt(req.body.quantity as string)

    // if (!order_id || !product_id || !quantity) {
    //   return res.status(400).json({
    //     error: 'Missing parameters',
    //   })
    // }
    console.log(order_id);

    const product = await orders.addProduct(
      order_id,
      product_id,
      quantity,
    )

    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const userOrder = async (req: Request, res: Response) => {
  const order = await orders.userOrder(req.params.id)
  res.json(order)
}


const ordersRoutes = (app: Application) => {
  app.get("/orders", verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
  app.post('/orders/add_product', verifyAuthToken, addProductToOrder)
  app.get('/orders/user_order/:id', verifyAuthToken, userOrder)
  app.delete('/orders/:id', verifyAuthToken, destroy)
};

export default ordersRoutes;
