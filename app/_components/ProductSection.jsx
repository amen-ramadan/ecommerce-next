'use client'

import React, { useEffect } from 'react'
import ProductList from './ProductList';
import ProductApis from '../_utils/ProductApis';

export default function ProductSection (){
  useEffect( () =>
  {
    getLatestProducts_()
  }, [] );
  const getLatestProducts_ = () =>
  {
    ProductApis.getLatestProducts().then( res =>{
      console.log( res.data.data ) 
    });
  }
  return (
    <div>
      <ProductList />
    </div>
  )
}
