import { validationResult } from 'express-validator';
import OrderModel from '../models/Order.js';
import crypto from "crypto";

function generateRandomNumber() {
  const range = 99999999 - 10000000 + 1;
  const randomBytes = crypto.randomBytes(4);
  const value = randomBytes.readUInt32BE(0);
  return 10000000 + (value % range);
}

export const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const doc = new OrderModel({
      orderId: generateRandomNumber(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      totalPrice: req.body.totalPrice,
      medicationsList: req.body.medicationsList
    })

    const order = await doc.save();

    res.json(order);
  }
  catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Can`t create order',
    })
  }
}

export const getByPhone = async (req, res) => {
  try {
    const orderPhone = req.params.phone;

    const order = await OrderModel.find({ phone: orderPhone });

    if (!order || order.length === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Error finding order by phone'
    })
  }
}

export const getByEmail = async (req, res) => {
  try {
    const orderEmail = req.params.email;

    const order = await OrderModel.find({ email: orderEmail });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.json(order);
  }
  catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Order not found',
    })
  }
}

export const getByOrderID = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await OrderModel.find({ orderId: orderId });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.json(order);
  }
  catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Order not found',
    })
  }
}