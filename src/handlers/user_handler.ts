import express, { Application, Request, Response } from "express";
import { User, Users } from "../models/user";

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
    res.json(newuser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}


const usersRoutes = (app: Application) => {
  app.get("/users", index)
  app.get('/users/:id', show)
  app.post('/users', create)
};

export default usersRoutes;
