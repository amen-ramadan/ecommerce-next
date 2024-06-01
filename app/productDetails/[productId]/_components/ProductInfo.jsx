import React from "react";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import SkeletonProductInfo from "./SkeletonProductInfo";

export default function ProductInfo({ product }) {
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

        <button className="text-white rounded-md flex gap-2 hover:bg-teal-600 p-3  bg-primary">
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
