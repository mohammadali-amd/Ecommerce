import { mongooseConnect } from "@/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
   const { method } = req;
   await mongooseConnect();
   await isAdminRequest(req, res);

   // console.log(req.body);

   if (method === 'GET') {
      if (req.query?.id) {
         res.json(await Product.findOne({ _id: req.query.id }));
      } else {
         res.json(await Product.find());
      }
   }

   if (method === 'POST') {
      const { title, mainPhoto, description, price, category, properties } = req.body;
      const productDoc = await Product.create({
         title, mainPhoto, description, price, category, properties
      });
      res.json(productDoc);
   }

   if (method === 'PUT') {
      const { title, mainPhoto, description, price, category, properties, _id } = req.body;
      await Product.updateOne({ _id }, { title, mainPhoto, description, price, category, properties });
      res.json(true);
   }

   if (method === 'DELETE') {
      if (req.query?.id) {
         await Product.deleteOne({ _id: req.query?.id });
         res.json(true);
      }
   }
}