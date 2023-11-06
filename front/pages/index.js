import Featured from '@/components/Featured'
import Heaedr from '@/components/Heaedr'
import { Product } from '@/models/Product'
import { mongooseConnect } from '@/mongoose';

export default function Home({ product }) {
  return (
    <div>
      <Heaedr />
      <Featured product={product} />
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '6537d4ced1edce905392d2be';
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) }
  }
}