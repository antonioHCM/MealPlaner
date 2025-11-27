# MealPlaner

Project overview

Goal: Build a full-stack web application (MERN) where users register/login and create Products (from Danish supermarkets) and Recipes that use those products. Products are crowdsourced: any user can add products which become available for all users. Recipes compute their total price from the product prices used. In a later phase Swagger (OpenAPI) will be added to document and test the API.

Core entities:

User — registers, logs in, authors recipes and products.

Product — name, picture (URL), supermarketChain, price, createdBy.

Recipe — recepiName, authorUser, date, list of products (with quantities), aggregated price.

Tech stack:

Frontend: React (create-react-app or Vite), React Router, state management (Context / Redux optional), Tailwind/CSS modules.

Backend: Node.js + Express.

Database: MongoDB (hosted on MongoDB Atlas or self-hosted). Use Mongoose for schemas.

Auth: JWT (access + refresh optional) + password hashing (bcrypt).

File storage: product images — prefer cloud storage (S3, DigitalOcean Spaces, or Cloudinary) and store URLs in DB.

API docs: Swagger / OpenAPI integrated with Express
