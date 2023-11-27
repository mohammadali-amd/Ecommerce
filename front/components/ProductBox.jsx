import styled from "styled-components"
import Link from "next/link";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const WhiteBox = styled(Link)`
   background-color: #fff;
   padding: 20px;
   height: 120px;
   display: flex;
   text-align: center;
   align-items: center;
   justify-content: center;
   border-radius: 10px;
   img {
      max-width: 100%;
      max-height: 80px;
   }
`;

const Title = styled(Link)`
   font-weight: normal;
   font-size: 1.1rem;
   color: inherit;
   text-decoration: none;
   margin: 0;
`;

const ProductInfoBox = styled.div`
   margin-top: 5px;
`;

const PriceRow = styled.div`
   display: block;
   align-items: center;
   justify-content: space-between;
   margin-top: 5px;
   @media screen and (min-width: 768px) {
      display: flex;
      gap: 5px;
   }
`;

const Price = styled.div`
   font-size: 1rem;
   font-weight: bold;
   text-align: right;
   @media screen and (min-width: 768px) {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: left;
   }
`;

const ProductBox = ({ _id, title, description, price, mainPhoto }) => {
   const { addProduct } = useContext(CartContext)
   const url = '/product/' + _id;
   return (
      <div>
         <WhiteBox href={url}>
            <img src={mainPhoto} alt="" />
         </WhiteBox>
         <ProductInfoBox>
            <Title href={url}>{title}</Title>
            <PriceRow>
               <Price>
                  ${price}
               </Price>
               <div>
                  <Button onClick={() => addProduct(_id)} primary={1} outline={1} block={1}>
                     <CartIcon /> Add to cart
                  </Button>
               </div>
            </PriceRow>
         </ProductInfoBox>
      </div>
   )
}

export default ProductBox