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

// app.get('/articles', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })

// app.get('/articles/:id', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the SHOW route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })

// app.post('/articles', (req: Request, res: Response) => {
//     const article: Article = {
//         title: req.body.title,
//         content: req.body.content
//     }
//     try {
//         res.send('this is the CREATE route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })

// app.put('/articles/:id', (req: Request, res: Response) => {
//     const article: Article = {
//         id: req.params.id,
//         title: req.body.title,
//         content: req.body.content
//     }
//     try {
//         res.send('this is the EDIT route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })

// app.delete('/articles/:id', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the DELETE route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })