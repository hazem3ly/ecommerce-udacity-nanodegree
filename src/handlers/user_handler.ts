import express, { Application, Request, Response } from "express";
import { User, Users } from "../models/user";
import jwt from "jsonwebtoken"
import { verifyAuthToken } from "../middleware/verify_token";

const users = new Users();

const index = async (req: Request, res: Response) => {
  const usersReslults = await users.index();
  res.json(usersReslults);
};

const show = async (req: Request, res: Response) => {
  const user = await users.show(req.params.id)
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    }
    const newuser = await users.create(user)
    let token = jwt.sign({ newuser }, process.env.TOKEN_SECRET as string)
    res.json({ token: token })
  } catch (err) {
    res.status(400).json(err)
  }
}

const authenticate = async (req: Request, res: Response) => {
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let password = req.body.password

  const newuser = await users.authenticate(first_name, last_name, password);

  let token = jwt.sign({ newuser }, process.env.TOKEN_SECRET as string)
  res.json({ token: token })
}

const usersRoutes = (app: Application) => {
  app.get("/users", verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.post('/users/authenticate', authenticate)
};

export default usersRoutes;
