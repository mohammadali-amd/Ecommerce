import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrdersPage = () => {
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      axios.get('/api/orders').then(response => {
         setOrders(response.data);
      });
   }, []);

   return (
      <Layout>
         <h1>Orders</h1>
         <table className='basic'>
            <thead>
               <tr>
                  <th>Date</th>
                  <th>Paid</th>
                  <th>Recipient</th>
                  <th>Products</th>
               </tr>
            </thead>
            <tbody>
               {orders.length > 0 && orders.map(order => (
                  <tr className='border-b border-gray-200'>
                     <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                     <td className={'flex justify-center ' + order.paid ? 'text-green-600' : 'text-red-600'}>
                        {order.paid ? 'YES' : 'NO'}
                     </td>
                     <td>
                        <div className='flex justify-center'>
                           {order.name} {order.email}
                        </div>
                        <div className='flex justify-center'>
                           {order.city} {order.postalCode} {order.Country}
                        </div>
                        <div className='flex justify-center'>
                           <span className='md:w-3/5 text-center'>
                              {order.streetAddress}
                           </span>
                        </div>
                     </td>
                     <td>
                        {order.line_items.map(item => (
                           <>
                              {item.price_data?.product_data.name} x
                              {item.quantity} <br />
                           </>
                        ))}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </Layout>
   )
}

export default OrdersPage;