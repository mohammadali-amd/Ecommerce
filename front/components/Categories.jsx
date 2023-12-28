import Image from 'next/image'
import {
   speaker, laptop, accesories, watch, phone, ps5, printer, tablet, powerbank, airpod,
} from '@/public/images/Categories'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const categories = [
   {
      name: 'Speaker',
      image: speaker
   },
   {
      name: 'Laptop',
      image: laptop
   },
   {
      name: 'Accesories',
      image: accesories
   },
   {
      name: 'Watch',
      image: watch
   },
   {
      name: 'Phone',
      image: phone
   },
   {
      name: 'PS5',
      image: ps5
   },
   {
      name: 'Printer',
      image: printer,
   },
   {
      name: 'Tablet',
      image: tablet,
   },
   {
      name: 'Powerbank',
      image: powerbank,
   },
   {
      name: 'Airpod',
      image: airpod,
   },
]

const Categories = () => {
   return (
      <div className='flex justify-center my-8 mx-8'>
         <Swiper
            style={{
               '--swiper-navigation-color': '#000',
               '--swiper-pagination-color': '#000',
            }}
            slidesPerView={6}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
         >
            {categories.map((item) => (
               <SwiperSlide className='md:mx-8'>
                  <div className="grid justify-center gap-6">
                     <Image src={item.image} alt={item.name} className='border-2 border-red-500 rounded-full bg-slate-200 hover:border-4 w-36' />
                     <p className='text-center'>{item.name}</p>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default Categories