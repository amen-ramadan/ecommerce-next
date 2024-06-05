'use client'

import React, { useContext } from "react";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../../_utils/CartApis";
import { CartContext } from "../../../_context/CartContext";

export default function ProductInfo ( { product } )
{
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext( CartContext )
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else
    {

      // ال key التي اعتمدت عليها مثل username انت مكريتها من قبل في stapi
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      CartApis.addToCart(data).then(( res ) => {
        setCart( oldCart => [ ...oldCart,
          {
            id: res?.data?.data?.id,
            product
          }
        ] )
      }).catch(( err ) => {
        console.log('error ', err)
      })
    }
  }
  return (
    <div>
      { product?.attributes?.banner?.data?.attributes?.url ? (
        <div>
        <h2 className="text-[20px]">{product?.attributes?.title}</h2>
        <p className="text-[16px] text-gray-400">
          {product?.attributes?.category}
        </p>
        <p className="text-[16px] mt-5">
          {product?.attributes?.description[0]?.children[0].text}
        </p>
        <p className="text-[11px] text-gray-500 flex gap-2 mt-2 items-center">
          {" "}
          {product?.attributes?.instantDelivery ? (
            <BadgeCheck className="w-4 h-4 text-gray-500" />
          ) : (
            <AlertOctagon />
          )}
          Eligible For Instant Delivery
        </p>
        <p className="text-[32px] mt-3 text-primary">
          {" "}
          ${product?.attributes?.price}
        </p>

          <button className="text-white rounded-md flex gap-2 hover:bg-teal-600 p-3  bg-primary"
          onClick={handleAddToCart}>
          {" "}
          <ShoppingCart />
          Add to cart
        </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
}
