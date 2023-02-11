# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index = GET `/products`
- Show = GET `/products/:id`
- Create [token required] = POST `/products`
- Delete [token required] = DELETE `/products/:id`

#### Users

- Index [token required] = GET `/users`
- Show [token required] = GET `/users/:id`
- Create N[token required] = POST `/users`
- Authinticate [No token required] = POST `/users/authenticate`

#### Orders

  app.delete('/orders/:id', verifyAuthToken, destroy)

- Index [token required] = GET `/orders`
- Show [token required] = GET `/orders/:id`
- Create [token required] = POST `/orders`
- AddProductToOrder [token required] = POST `/orders/add_product`
- UserOrders [token required] = GET `/orders/user_order/:id`
- DeleteOrder [token required] = DELETE `/orders/:id`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema

Products Table
(id number, name VARCHAR, price number, category VARCHAR);

  Column  |         Type          | Collation | Nullable |               Default
----------+-----------------------+-----------+----------+--------------------------------------
 id       | integer               |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(50) |           | not null |
 price    | integer               |           | not null |
 category | character varying(50) |           |          |

Users Table
(id number, first_name VARCHAR, last_name VARCHAR, password VARCHAR);

   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name | character varying(50)  |           | not null |
 last_name  | character varying(50)  |           | not null |
 password   | character varying(255) |           | not null |

Orders Table
(id number, user_id integer (foreign key to users table), status VARCHAR);

 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer               |           |          |
 status  | character varying(50) |           |          |

OrderProducts Table
(id number, quantity integer, order_id integer (foreign key to orders table), product_id integer  (foreign key to products table));

   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+-------------------------------------------
 id         | integer |           | not null | nextval('order_product_id_seq'::regclass)
 quantity   | integer |           |          |
 order_id   | integer |           |          |
 product_id | integer |           |          |
