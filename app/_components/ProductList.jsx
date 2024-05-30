import React from 'react'
import ProductItem from './ProductItem';

export default function ProductList({productList}) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
      { productList.map( product => (
        <ProductItem key={product.id} product={product}/>
      ))}
    </div>
  )
}
