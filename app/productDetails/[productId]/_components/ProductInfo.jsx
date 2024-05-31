import React from 'react'
import  {ShoppingCart} from 'lucide-react';

export default function ProductInfo({product}) {
  return (
    <div>
      <h2 className='text-[20px]'>{ product?.attributes?.title }</h2>
      <p className='text-[16px] text-gray-400'>{ product?.attributes?.category }</p>
      <p className='text-[16px] mt-5'>{ product?.attributes?.description[ 0 ]?.children[ 0 ].text }</p>
      
      <p className='text-[32px] mt-3 text-primary'> ${ product?.attributes?.price }</p>

      <button className='text-white rounded-md flex gap-2 hover:bg-teal-600 p-3  bg-primary'> <ShoppingCart/>Add to cart</button>
    </div>
  )
}
