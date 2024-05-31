import React from 'react'
import  Image  from 'next/image';
import { List } from 'lucide-react';
import Link from 'next/link'

export default function ProductItem ( {product} )
{
  console.log(product);
  return (
    <Link className='p-1 hover:border rounded-lg hover:shadow-md border-primary transition-all cursor-pointer'
      href={ `/productDetails/${ product?.id }` }>
      <Image src={ product?.attributes?.banner?.data?.attributes?.url }
        width={ 400 } height={ 350 } alt='banner-card'
        className='rounded-t-lg h-[170px] object-cover'
      />
      <div className='flex justify-between p-3 items-center rounded-b-lg bg-gray-50'>
      <div className=''>
        <h2 className='text-[14px] font-medium line-clamp-1'>{ product?.attributes?.title }</h2>
        <h3 className='text-[10px] text-gray-400 flex gap-1 items-center'><List className='h-4 w-4'/>{ product?.attributes?.category }</h3>
      </div>
      <h2>${ product?.attributes?.price }</h2>
      </div>
    </Link>
  )
}
