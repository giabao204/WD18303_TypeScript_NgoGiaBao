// Bai 1

// import 'reflect-metadata';
// import { plainToClass } from 'class-transformer';
// import { validate } from 'class-validator';

// import { Product } from './model/product';

// const products = [
//   { title: 'A Carpet', price: 29.99 },
//   { title: 'A Book', price: 10.99 },
// ];

// const newProd = new Product('', -5.99);

// validate(newProd).then((errors) => {
//   if (errors.length > 0) {
//     console.log('VALIDATION ERRORS!');
//     console.log(errors);
//   } else {
//     console.log(newProd.getInformation());
//   }
// });


// Bai 2
import express from "express";
import bodyParser from "body-parser";
import { json } from "body-parser";
import * as controller from "./controller";
const app = express();


app.use(json());

app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

app.use("/route", router);

router.get("/", (request, response) => {
  // Gửi phản hồi 'Hello world Route with Nodemon 1!'
  response.send("Hello world Route with Nodemon 1!");
});

router.get("/users", controller.users);

router.post("/users/create", controller.create);
