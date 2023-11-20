import styled from "styled-components"
import Center from "./Center"
import Button from "./Button"
import ButtonLink from "./ButtonLink"
import CartIcon from "./icons/CartIcon"

const Bg = styled.div`
   background-color: #222;
   color: #fff;
   padding: 50px 0;
`
const Title = styled.h1`
   margin: 0 0 10px 0;
   font-size: 3rem;
   font-weight: bold;
`
const Desc = styled.p`
   color: #aaa;
   font-size: 1rem;
`
const ColumWrapper = styled.div`
   display: grid;
   grid-template-columns: 1.1fr .9fr;
   gap: 40px;
   img {
      max-width: 100%;
   }
`
const ButtonsWrapper = styled.div`
   display: flex;
   gap: 10px;
   margin-top: 25px;
`
const Column = styled.div`
   display: flex;
   align-items: center;
`

const Featured = ({ product }) => {
   return (
      <Bg>
         <Center>
            <ColumWrapper>
               <Column>
                  <div>
                     <Title>{product.title}</Title>
                     <Desc>{product.description}</Desc>
                     <ButtonsWrapper>
                        <ButtonLink href={'/products/' + product._id} outline={1} white={1}>Read more</ButtonLink>
                        <Button href={'/'} white={1}>
                           <CartIcon />
                           Add to cart
                        </Button>
                     </ButtonsWrapper>
                  </div>
               </Column>
               <Column>
                  <img src="https://picsum.photos/500/300" alt="feature image" />
               </Column>
            </ColumWrapper>
         </Center>
      </Bg>
   )
}

export default Featured