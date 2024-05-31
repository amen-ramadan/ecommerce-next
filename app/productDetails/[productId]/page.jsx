'use client'

import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductApis from "@/app/_utils/ProductApis"
import { useEffect, useState } from "react";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";


export default function productDetails ( { params } )
{
  const [productDetails, setProductDetails] = useState({});
  useEffect( () =>
  {
    getProductById_()
  }, [] );
  const getProductById_ = (  ) =>
  {
    ProductApis.getProductById( params?.productId ).then( res => setProductDetails(res.data.data) );
  }
  return (
    <div className="px-10 md:px-28 py-8">
      <BreadCrumb />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0">
        <ProductBanner product={productDetails}/>
        <ProductInfo product={productDetails}/>
      </div>
    </div>
    
  )
}
