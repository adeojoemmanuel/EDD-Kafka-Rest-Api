import { Request, Response } from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/productdb', { useNewUrlParser: true, useUnifiedTopology: true });

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model('Product', ProductSchema);

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.sendStatus(404);
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
};
