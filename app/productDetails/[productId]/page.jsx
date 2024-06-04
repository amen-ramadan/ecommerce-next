'use client'

import BreadCrumb from "../../_components/BreadCrumb";
import ProductApis from "../../_utils/ProductApis"
import { useEffect, useState } from "react";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";


export default function productDetails ( { params } )
{
  const path = usePathname();
  const [ productDetails, setProductDetails ] = useState( {} );
  const [ productList, setProductList ] = useState( [] );
  useEffect( () =>
  {
    getProductById_()
  }, [] );
  const getProductById_ = (  ) =>
  {
    ProductApis.getProductById( params?.productId ).then( res =>
    {
      setProductDetails( res.data.data );
      getProductListByCategory( res.data.data );
    } );
  }
  ////////////////////////////  filter products by category
  const getProductListByCategory = (product) => {
    ProductApis.getProductsByCategory(product?.attributes.category).then(
      (res) => {
        setProductList( res.data.data );
      }
    );
  };
  return (
    <div className="px-10 md:px-28 py-8">
      <BreadCrumb path={path}/>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 ">
        <ProductBanner product={productDetails}/>
        <ProductInfo product={productDetails}/>
      </div>
      <div>
        <h2 className="mt-24 text-xl mb-4">Similar Products</h2>
        <ProductList productList={productList}/>
      </div>
    </div>
    
  )
}
