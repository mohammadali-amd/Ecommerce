import styled from "styled-components";
import { mongooseConnect } from "@/mongoose";
import { Product } from "@/models/Product";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

const ProductsPage = ({ products }) => {
   return (
      <>
         <Header />
         <Center>
            <Title>ProductsPage</Title>
            <ProductsGrid products={products} />
         </Center>
      </>
   )
}

export default ProductsPage;

export async function getServerSideProps() {
   await mongooseConnect;
   const products = await Product.find({}, null, { sort: { '_id': -1 } });
   return {
      props: {
         products: JSON.parse(JSON.stringify(products)),
      }
   }
}