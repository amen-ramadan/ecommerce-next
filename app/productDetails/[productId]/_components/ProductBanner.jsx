import React from 'react'
import Image  from 'next/image';

export default function ProductBanner({ product }) {
  return (
    <div>
      <Image
        alt='product-details-banner'
        width={ 400 } height={ 400 }
        src={ product?.attributes?.banner?.data?.attributes?.url }
        className='rounded-lg' />
    </div>
  )
}
