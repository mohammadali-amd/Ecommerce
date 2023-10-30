import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductForm = ({
   _id,
   title: existingTitle,
   mainPhoto: existingMainPhoto,
   description: existingDescription,
   price: existingPrice,
}) => {
   const [title, setTitle] = useState(existingTitle || '');
   const [mainPhoto, setMainPhoto] = useState(existingMainPhoto || '');
   // const [photos, setPhotos] = useState([{ photos: "" }]);
   const [description, setDescription] = useState(existingDescription || '');
   const [price, setPrice] = useState(existingPrice || '');
   const [goToProducts, setGoToProducts] = useState(false);
   const router = useRouter();

   // const handlePhotoChange = (e, index) => {
   //    const { name, value } = e.target;
   //    const list = [...photos];
   //    list[index][name] = value;
   //    setPhotos(list);
   // };

   // const handlePhotoRemove = (index) => {
   //    const list = [...photos];
   //    list.splice(index, 1);
   //    setPhotos(list);
   // };

   // const handlePhotoAdd = () => {
   //    setPhotos([...photos, { photos: "" }]);
   // };

   const saveProduct = async (e) => {
      e.preventDefault();
      const data = { title, mainPhoto, photos, description, price };
      if (_id) {
         // Update
         await axios.put('/api/products', { ...data, _id })
      } else {
         // Create
         await axios.post('/api/products', data);
      }
      setGoToProducts(true);
   }

   if (goToProducts) {
      router.push('/products')
   }

   return (
      <form onSubmit={saveProduct}>
         <label>Product Name</label>
         <input
            type="text"
            placeholder="Product Name"
            value={title}
            onChange={e => setTitle(e.target.value)}
         />
         <label>Main Photo</label>
         <input
            type="text"
            placeholder="Main Photo"
            value={mainPhoto}
            onChange={e => setMainPhoto(e.target.value)}
         />
         {/* <label>Photo Gallery</label>
         {photos.map((singlePhoto, index) => (
            <div key={index}>
               <div className="flex gap-2 mb-1">
                  <input
                     name="photos"
                     type="text"
                     id="photos"
                     placeholder={`Image Link (${index + 1})`}
                     value={singlePhoto.photos}
                     onChange={(e) => handlePhotoChange(e, index)}
                     required
                  />
                  {photos.length !== 1 && (
                     <button
                        type="button"
                        onClick={() => handlePhotoRemove(index)}
                        className="bg-red-600 mb-2"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                     </button>
                  )}
               </div>
               {photos.length - 1 === index && photos.length < 4 && (
                  <button
                     type="button"
                     onClick={handlePhotoAdd}
                     className="bg-blue-900 mb-2"
                  >
                     + Add more photos
                  </button>
               )}
            </div>
         ))} */}
         <label>Description</label>
         <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
         />
         <label>Price (in USD)</label>
         <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
         />
         <button
            type="submit"
            className="bg-blue-900"
         >
            Save
         </button>
      </form>
   )
}

export default ProductForm;