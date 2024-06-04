'use client'

import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";

export default function Header ()
{
  const { user } = useUser();

  // هون نحنا بدنا نعمل كولينغ مع ال apis لحتى نجيب الايميل ولحتى نبعتو مع الطلب الخاص بجلب بيانات المنتجات الخاصة بالكارت الخاصة بهذا المنتج
  useEffect( () =>
  {
    // اذا اليوزر موجود رح يبدء بعمل الاتصال او اذا اتغير اليوزر رح يرجع يعمل اتصال
    user && getCartItems();
  }, [ user ] );
  

  const getCartItems = () =>
  {
    CartApis.getUserCartItems( user.primaryEmailAddress.emailAddress ).then( ( res ) =>
    {
      console.log( 'respose from cart items', res?.data?.data );
      res?.data?.data?.forEach(  item  =>
      {
        setCart( (oldCart) => [ ...oldCart,
          {
            id: item?.id,
            product: item?.attributes?.products?.data[0]
          }
        ] )
      } )
    })
  }

  const [loggedIn, setLoggedIn] = useState( false );
  const {cart, setCart} = useContext(CartContext)
  useEffect( () =>
  {
    setLoggedIn( window.location.href.toString().includes( 'sign-in' ) );
  }, [] );
  return !loggedIn && (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
          <Image src={'/logo.svg'} width={50} height={50} alt="logo" />

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    {" "}
                    Home{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Explore{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About Us{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Contact Us{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              { !user ? 
              <div className="sm:flex sm:gap-4">
                <a
                  className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
                  href="/sign-in"
                >
                  Login
                </a>

                <a
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-teal-500/75 sm:block"
                  href="sign-in"
                >
                  Register
                </a>
                </div>

                : <div className="flex items-center gap-5">
                  <UserButton afterSignOutUrl="/" />
                  <span className="flex gap-1 cursor-pointer"><ShoppingCart/> ({cart?.length})</span>
                  
                </div>
              
            }

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
