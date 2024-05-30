import React from 'react'
import  Image  from 'next/image';
import  {List}  from 'lucide-react';

export default function ProductItem ( {product} )
{
  console.log(product);
  return (
    <div>
      <Image src={ product?.attributes?.banner?.data?.attributes?.url }
        width={ 400 } height={ 350 } alt='banner-card'
        className='rounded-t-lg h-[170px] object-cover'
      />
      <div>
      <div className='p-3'>
        <h2 className='text-[14px] font-medium'>{ product?.attributes?.title }</h2>
        <h3 className='text-[10px] text-gray-400 flex gap-1 items-center'><List className='h-4 w-4'/>{ product?.attributes?.category }</h3>
      </div>
      
      </div>
    </div>
  )
}
