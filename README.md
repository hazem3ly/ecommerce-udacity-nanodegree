# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Installation Instructions

1- run (npm i) to intializing project
2- The app run on port 3000 and database run on port 5432.
2- build database
     on postgres terminal run the following commands
     a - create database ecommerce; // dev database
     b - create database ecommerce_test; // test database
     c - create user admin with password "password123";
     d - \c ecommerce postgres; // switch to ecommerce database
     e - GRANT ALL ON SCHEMA public TO admin; // to give the new user permission to admin
     f - \c ecommerce_test postgres;
     g - GRANT ALL ON SCHEMA public TO admin; // to give the new user permission to admin

### Create .env file with following params

 POSTGRES_HOST=127.0.0.1
 POSTGRES_DP=ecommerce
 POSTGRES_DP_TEST=ecommerce_test
 POSTGRES_USER=admin
 POSTGRES_PASSWORD=password123
 NODE_ENV=dev
 BCRYPT_PASSWORD=ABCDEFGHIJKLMNO1234
 SALT_ROUNDS=10
 TOKEN_SECRET=QWERTY1234

 NOTE: i added an .temp_env file as reference

### DB Creation and Migrations

 run the following commands on project terminal
    a - db-migrate up // to setup database tables

### TESTING

  run the following command to run test
     - npm test
