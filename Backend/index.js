import express from 'express';
import mongoose from 'mongoose';
import { orderValidation } from './validations/order.js';
import cors from 'cors';

import {StoresController, OrderController, MedicationController, CouponController} from './controllers/index.js'

const PORT = 4444;

mongoose
  .connect('mongodb+srv://meddelivery:meddelivery@clustermeddelivery.j5c3sej.mongodb.net/medDelivery?retryWrites=true&w=majority&appName=ClusterMedDelivery')
  .then(() => console.log('>>> DataBase OK'))
  .catch((err) => console.log('>>> DataBase error!!!', err));

const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`>>> Server is running on port ${PORT}`);
})

// Routes

// ORDER
app.post('/orders', orderValidation, OrderController.create);
app.get('/orders/:orderId', OrderController.getByOrderID);
app.get('/orders/phone/:phone', OrderController.getByPhone);
app.get('/orders/email/:email', OrderController.getByEmail);

// DRUG STORES
app.get('/drugstores', StoresController.getAll);
app.get('/drugstores/:id', StoresController.getById);

// MEDICATIONS
app.get('/medications/:storeId', MedicationController.getByStoreId);
app.patch('/medications/:medId', MedicationController.updateIsFavorite);

// COUPONS
app.get('/coupons', CouponController.getAll);
app.get('/coupons/:couponCode', CouponController.getByCode);
