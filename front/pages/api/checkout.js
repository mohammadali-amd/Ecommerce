import { mongooseConnect } from "@/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
   if (req.method !== 'POST') {
      res.json('Should be a POST request!');
      return;
   }

   const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

   await mongooseConnect();
   const productsIds = cartProducts;
   const uniqueIds = [...new Set(productsIds)];
   const productsInfo = await Product.find({ _id: uniqueIds });

   let line_items = [];

   for (const productId of uniqueIds) {
      const productInfo = productsInfo.find(p => p._id.toString() === productId);
      const quantity = productsIds.filter(id => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
         line_items.push({
            quantity,
            price_data: {
               currency: 'USD',
               product_data: { name: productInfo.title },
               unit_amount: quantity + productInfo.price,
            }
         })
      }
   }

   const orderDoc = await Order.create({
      line_items, name, email, city, postalCode, streetAddress, country, paid: true
   })

   // const session = await stripe.checkout.sessions.create({
   //    line_items,
   //    mode: 'payment',
   //    customrt_email: email,
   //    success_url: process.env.PUBLIC_URL + '/cart?success=1',
   //    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
   //    metadata: { orderId: orderDoc._id.toString() },
   // })

   // res.json({ url: session.url });

   res.json(orderDoc);
}
