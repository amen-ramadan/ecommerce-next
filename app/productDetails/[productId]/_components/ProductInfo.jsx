'use client'

import React, { useContext, useState } from "react";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../../_utils/CartApis";
import { CartContext } from "../../../_context/CartContext";
import Toast from "../../../_components/Toast";

export default function ProductInfo({ product }) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext)

  const [toastMessage, setToastMessage] = useState("");  // تغيير toastMessage بناءً على الحالة
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1000); // إخفاء بعد 1 ثانية
  };

  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const isInCart = cart.some(item => item.product.id === product.id);
      if (isInCart) {
        showToast("Product is already in the cart!");
        return;
      }

      // ال key التي اعتمدت عليها مثل username انت مكريتها من قبل في stapi
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      CartApis.addToCart(data).then((res) => {
        setCart(oldCart => [...oldCart, {
          id: res?.data?.data?.id,
          product
        }]);
        showToast("Product added to cart!");
      }).catch((err) => {
        console.log('error ', err);
      })
    }
  }

  return (
    <div>
      {product?.attributes?.banner?.data?.attributes?.url ? (
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
            {product?.attributes?.instansDelivery ? (
              <BadgeCheck className=" text-green-500" />
            ) : (
              <AlertOctagon className=" text-gray-500" />
            )}
            Eligible For Instant Delivery
          </p>
          <p className="text-[32px] mt-3 text-primary">
            {" "}
            ${product?.attributes?.price}
          </p>

          <button className="text-white rounded-md flex gap-2 hover:bg-teal-600 p-3 bg-primary"
            onClick={handleAddToCart}>
            {" "}
            <ShoppingCart />
            Add to cart
          </button>
          {toastVisible && <Toast message={toastMessage} duration={1000} onClose={() => setToastVisible(false)} />}
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
}
