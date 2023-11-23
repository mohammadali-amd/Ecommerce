import { Order } from "@/models/Order";
import { mongooseConnect } from "@/mongoose";

export default async function handler(req, res) {
   await mongooseConnect();
   res.json(await Order.find().sort({ createdAt: -1 }));
}