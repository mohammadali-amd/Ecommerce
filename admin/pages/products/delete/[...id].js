import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const DeleteProductPage = () => {
   const [productInfo, setProductInfo] = useState();
   const router = useRouter();
   const { id } = router.query;

   const goBack = () => {
      router.push('/products');
   }

   const deleteProduct = async () => {
      await axios.delete('/api/products?id=' + id);
      goBack();
   }

   useEffect(() => {
      if (!id) {
         return;
      }
      axios.get('/api/products?id=' + id).then(response => {
         setProductInfo(response.data);
      })
   }, [id])

   return (
      <Layout>
         <h1 className="text-center">Delete Product</h1>
         <p className="text-center text-lg">Are you sure to delete '{productInfo?.title}'?</p>
         <div className="flex justify-center gap-2 mt-4">
            <button onClick={deleteProduct} className="bg-red-700">I'm Sure</button>
            <button onClick={goBack} className="btn-default ">Cancel</button>
         </div>
      </Layout>
   )
}

export default DeleteProductPage;