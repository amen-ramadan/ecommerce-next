'use client'

import React, { useEffect, useState } from 'react'
import ProductList from './ProductList';
import ProductApis from '../_utils/ProductApis';

export default function ProductSection ()
{
  const [ productList, setProductList ] = useState( [] );

  const getLatestProducts_ = () =>
    {
      ProductApis.getLatestProducts().then( res =>{
        setProductList( res.data.data );
      });
  }
  
  useEffect( () =>
  {
    getLatestProducts_()
  }, [] );
  
  return (
    <div className='px-10 md:px-20'>
      <h2 className='text-lg my-4'>Our Latest Products</h2>
      <ProductList productList={productList} />
    </div>
  )
}
