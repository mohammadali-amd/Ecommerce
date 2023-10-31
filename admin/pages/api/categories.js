import { Category } from "@/models/Category";
import { mongooseConnect } from "@/mongoose";

export default async function handle(req, res) {
   const { method } = req;
   await mongooseConnect();

   if (method === 'GET') {
      const categories = await Category.find().populate('parentCategory');
      res.json(categories)
   }

   if (method === 'POST') {
      const { name, parentCategory, properties } = req.body;
      const categoryDoc = await Category.create({
         name,
         parentCategory: parentCategory || undefined,
         properties
      });
      res.json(categoryDoc);
   }

   if (method === 'PUT') {
      const { name, parentCategory, properties, _id } = req.body;
      const categoryDoc = await Category.updateOne({ _id }, {
         name,
         parentCategory: parentCategory || undefined,
         properties
      });
      res.json(categoryDoc);
   }

   if (method === 'DELETE') {
      const { _id } = req.query;
      await Category.deleteOne({ _id });
      res.json('Ok!');
   }

}