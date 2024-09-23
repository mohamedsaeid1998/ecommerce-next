"use client";

import Image from "next/image";
import { Button } from "./ui/button";

const CartModal = () => {
  const cartItems = true;
  return (
    <>
      <div className="w-max absolute z-20 bg-white top-12 right-0 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-6 ">
        {!cartItems ? (
          <div>Cart is empty!</div>
        ) : (
          <>
          <h2 className="text-xl">Shopping Cart</h2>
            {/* LIST */}
            <div className="flex flex-col space-y-8">
              {/* Item */}
              <div className="flex space-x-4">
                <Image
                  src="https://images.pexels.com/photos/28164807/pexels-photo-28164807/free-photo-of-the-blue-water-and-white-sand-beach-in-zakynthos-greece.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt="itemImage"
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full ">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex items-center justify-between space-x-8">
                      <h3 className="font-semibold">Product Name</h3>
                      <div className="p-1 bg-gray-50 rounded-sm">49$</div>
                    </div>
                    {/* DESC */}
                    <div className="text-gray-500 text-sm">Available</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">qty 8</span>
                    <span className="text-blue-500">Remove</span>
                  </div>
                </div>
              </div>
            </div>
            {/* FOOTER */}
            <div className="">
              <div className="flex items-center justify-between font-semibold">
                <span>Subtotal</span>
                <span>49$</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex items-center justify-between">
                <Button variant="outline">View Cart</Button>
                <Button >Checkout</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartModal;
