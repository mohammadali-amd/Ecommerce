import { useContext } from "react"
import { CartContext } from "./CartContext"
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from "styled-components"

import Center from "./Center"
import Button from "./Button"
import ButtonLink from "./ButtonLink"
import CartIcon from "./icons/CartIcon"

import { slider_banner_1, slider_banner_2, slider_banner_3 } from "@/public/images";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from "next/image"

const Bg = styled.div`
   background-color: #222;
   color: #fff;
   /* padding: 0 0 50px 0 ; */
`;

const Title = styled.h1`
   margin: 0 0 10px 0;
   font-size: 2rem;
   font-weight: bold;
   @media screen and (min-width: 768px) {
      font-size: 3rem;
   }
`;

const Desc = styled.p`
   color: #aaa;
   font-size: 1rem;
`;

const ColumWrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr;
   gap: 40px;
   img {
      max-width: 100%;
      max-height: 200px;
      display: block;
      margin: 0 auto;
   }
   div:nth-child(1) {
      order: 2;
   }
   @media screen and (min-width: 768px) {
      grid-template-columns: 1.1fr .9fr;
      div:nth-child(1) {
      order: 0;
      }
      img {
         max-width: 100%;
      }
   }
`;

const ButtonsWrapper = styled.div`
   display: flex;
   gap: 10px;
   margin-top: 25px;
`;

const Column = styled.div`
   display: flex;
   align-items: center;
`;

const Featured = ({ product }) => {
   // const { addProduct } = useContext(CartContext);
   // const addFeaturedToCart = () => {
   //    addProduct(product._id);
   // }

   return (
      <Bg>
         <div className="mb-10">
            <Swiper
               spaceBetween={30}
               loop={true}
               centeredSlides={true}
               autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
               }}
               pagination={{
                  clickable: true,
               }}
               navigation={true}
               modules={[Autoplay, Pagination, Navigation]}
               style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
               }}
            >
               <SwiperSlide>
                  <Image src={slider_banner_1} alt="slider-banner" />
               </SwiperSlide>
               <SwiperSlide>
                  <Image src={slider_banner_2} alt="slider-banner" />
               </SwiperSlide>
               <SwiperSlide>
                  <Image src={slider_banner_3} alt="slider-banner" />
               </SwiperSlide>
            </Swiper>
         </div>
         {/* <Center>
            <ColumWrapper>
               <Column>
                  <div>
                     <Title>{product.title}</Title>
                     <Desc>{product.description}</Desc>
                     <ButtonsWrapper>
                        <ButtonLink href={'/product/' + product._id} outline={1} white={1}>Read more</ButtonLink>
                        <Button white={1} onClick={addFeaturedToCart}>
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
         </Center> */}
      </Bg>
   )
}

export default Featured;