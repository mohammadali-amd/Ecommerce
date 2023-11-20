import { mongooseConnect } from '@/mongoose';
import { Product } from '@/models/Product'
import Heaedr from '@/components/Heaedr'
import Featured from '@/components/Featured'
import NewProducts from '@/components/NewProducts';

export default function Home({ featuredProduct, newProducts }) {
  return (
    <div>
      <Heaedr />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '6537d4ced1edce905392d2be';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}