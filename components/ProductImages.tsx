"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="">
        {/* MAIN IMAGE */}
        <div className="h-[500px] relative">
          <Image
            src={items[index].image?.url}
            alt="product Image"
            fill
            sizes="50vw"
            className="object-cover rounded-md"
          />
        </div>
        {/* SUB IMAGES */}
        <div className="flex justify-between items-center mt-8 gap-4">
          {items.slice(0, 4).map((item: any, idx: number) => (
            <div
              onClick={() => setIndex(idx)}
              key={item._id}
              className="w-1/4 h-32 relative gap-4 mt-8"
            >
              <Image
                src={item.image?.url}
                sizes="30vw"
                fill
                alt="product Image"
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImages;
