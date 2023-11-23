import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { CartContext } from "@/components/CartContext";
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import Input from "@/components/Input";

const ColumnWrapper = styled.div`
   display: grid;
   grid-template-columns: 1.3fr .7fr;
   gap: 40px;
   margin-top: 40px;
`;

const Box = styled.div`
   background-color: #fff;
   border-radius: 10px;
   padding: 30px;
`;

const ProductInfoCell = styled.td`
   padding: 10px 0;
`;

const ProductImageBox = styled.div`
   width: 90px;
   height: 90px;
   padding: 10px;
   background-color: #f0f0f0;
   border: 1px solid rgba(0, 0, 0, 0.1);
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   img{
      max-width: 70px;
      max-width: 70px;
   }
`;

const QuantityLabel = styled.span`
   padding: 0 3px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
`;

export default function CartPage() {
   const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
   const [products, setProducts] = useState([]);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [city, setcity] = useState('');
   const [postalCode, setPostalCode] = useState('');
   const [streetAddress, setSetstreetAddress] = useState('');
   const [country, setCountry] = useState('');
   const [isSuccess, setIsSuccess] = useState(false);

   useEffect(() => {
      if (cartProducts.length > 0) {
         axios.post('/api/cart', { ids: cartProducts })
            .then(response => {
               setProducts(response.data);
            })
      } else {
         setProducts([]);
      }
   }, [cartProducts])

   useEffect(() => {
      if (typeof window === 'undefined') {
         return;
      }
      if (window?.location.href.includes('success')) {
         setIsSuccess(true);
         clearCart();
      }
   }, [])


   const moreOfThisProduct = (id) => {
      addProduct(id);
   }

   const lessOfThisProduct = (id) => {
      removeProduct(id);
   }

   const goToPayment = async () => {
      const response = await axios.post('/api/checkout', {
         name, email, city, postalCode, streetAddress, country, cartProducts
      })

      if (response.data.paid) {
         window.location = window.location + '?success=1';
         // window.location = response.data.url;
      }
   }

   let total = 0;
   for (const productId of cartProducts) {
      const price = products.find(p => p._id === productId)?.price || 0;
      total += price;
   }

   if (isSuccess) {
      return (
         <>
            <Header />
            <Center>
               <ColumnWrapper>
                  <Box>
                     <h2>Thanks for your order.</h2>
                  </Box>
               </ColumnWrapper>
            </Center>
         </>
      )
   }

   return (
      <>
         <Header />
         <Center>
            <ColumnWrapper>
               <Box>
                  <Title>Cart</Title>
                  {products?.length > 0 ? (
                     <Table>
                        <thead>
                           <tr>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Price</th>
                           </tr>
                        </thead>
                        <tbody>
                           {products.map(product => (
                              <tr key={product._id}>
                                 <ProductInfoCell>
                                    <ProductImageBox>
                                       <img src={product.mainPhoto} alt={product.title} />
                                    </ProductImageBox>
                                    {product.title}
                                 </ProductInfoCell>
                                 <td>
                                    <Button
                                       onClick={() => lessOfThisProduct(product._id)}
                                    >
                                       -
                                    </Button>
                                    <QuantityLabel>
                                       {cartProducts.filter(id => id === product._id).length}
                                    </QuantityLabel>
                                    <Button
                                       onClick={() => moreOfThisProduct(product._id)}
                                    >
                                       +
                                    </Button>
                                 </td>
                                 <td>
                                    ${cartProducts.filter(id => id === product._id).length * product.price}
                                 </td>
                              </tr>
                           ))}
                           <tr>
                              <td></td>
                              <td></td>
                              <td>${total}</td>
                           </tr>
                        </tbody>
                     </Table>
                  ) : (
                     <div>Your cart is empty!</div>
                  )}
               </Box>
               {!!cartProducts?.length && (
                  <Box>
                     <h2>Order information</h2>
                     <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                        onChange={e => setName(e.target.value)}
                     />
                     <Input
                        type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                     />
                     <CityHolder>
                        <Input
                           type="text"
                           placeholder="City"
                           value={city}
                           name="city"
                           onChange={e => setcity(e.target.value)}
                        />
                        <Input
                           type="text"
                           placeholder="Postal Code"
                           value={postalCode}
                           name="postalCode"
                           onChange={e => setPostalCode(e.target.value)}
                        />
                     </CityHolder>
                     <Input
                        type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={e => setSetstreetAddress(e.target.value)}
                     />
                     <Input
                        type="text"
                        placeholder="Country"
                        value={country}
                        name="country"
                        onChange={e => setCountry(e.target.value)}
                     />
                     <Button onClick={goToPayment} block={1} black={1}>
                        Continue to payment
                     </Button>
                  </Box>
               )}
            </ColumnWrapper>
         </Center>
      </>
   )
}