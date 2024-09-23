/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { IAddToCart } from "@/interfaces";
import { useEffect, useState } from "react";
//@ts-ignore
const AddProduct = ({
  // productId,
  //  variantId,

  stockNumber,
}: IAddToCart) => {
  const [quantity, setQuantity] = useState(1);

  const handelQuantity = (type: "d" | "i") => {
    type === "d" && quantity > 1 ? setQuantity((prev) => prev - 1) : null;
    type === "i" && quantity < stockNumber
      ? setQuantity((prev) => prev + 1)
      : null;
  };
  const calcQuantity = () => {
    if (quantity > stockNumber) {
      setQuantity(1);
    }
  };
  useEffect(() => {
    calcQuantity();
  }, [stockNumber]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="font-medium">Choose a Quantity</h3>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
              <button
                className="cursor-pointer text-xl"
                onClick={() => handelQuantity("d")}
              >
                -
              </button>
              {quantity}
              <button
                className="cursor-pointer text-xl"
                onClick={() => handelQuantity("i")}
              >
                +
              </button>
            </div>
            {stockNumber < 1 ? (
              <div className="text-xs">Product is out of stock</div>
            ) : (
              <div className="text-xs">
                Only{" "}
                <span className="text-orange-500">{stockNumber} items</span>{" "}
                left!
                <br />
                {"Don't"} miss it
              </div>
            )}
          </div>
          <button className=" w-36 text-md rounded-3xl ring-1 ring-redColor text-redColor py-2 px-4 hover:bg-redColor hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
