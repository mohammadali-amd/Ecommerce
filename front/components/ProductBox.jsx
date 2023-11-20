import styled from "styled-components"
import Link from "next/link";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";

const ProductWrapper = styled.div`

`;

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
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-top: 5px;
`;

const Price = styled.div`
   font-size: 1.5rem;
   font-weight: bold;
`;

const ProductBox = ({ _id, title, description, price, mainPhoto }) => {
   const url = '/product/' + _id;
   return (
      <ProductWrapper>
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
                  <Button primary={1} outline={1}><CartIcon /></Button>
               </div>
            </PriceRow>
         </ProductInfoBox>
      </ProductWrapper>
   )
}

export default ProductBox