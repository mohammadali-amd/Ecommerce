import { mongooseConnect } from '@/mongoose';
import { Product } from '@/models/Product'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import NewProducts from '@/components/NewProducts';
import Categories from '@/components/Categories';

export default function Home({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured /*product={featuredProduct}*/ />
      <Categories />
      <NewProducts products={newProducts} />
    </div>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  // const featuredProductId = '6537d4ced1edce905392d2be';
  // const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  return {
    props: {
      // featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}