import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productsRoutes from './handlers/product_handler';
import usersRoutes from './handlers/user_handler';
import ordersRoutes from './handlers/order_handler';

const app: express.Application = express()
const address: string = "http://localhost:3000";

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app