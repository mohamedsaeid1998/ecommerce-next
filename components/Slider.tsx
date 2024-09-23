"use client";

import { ISlider } from "@/interfaces";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SLIDES } from "@/constants";

const Slider = () => {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <div className="h-[calc(100vh-80px)] overflow-hidden">
        <div
          className="w-max h-full flex transition-all ease-in-out duration-1000"
          style={{ transform: `translateX(-${current * 100}vw)` }}
        >
          {SLIDES.map(({ id, title, description, img, url, bg }: ISlider) => (
            <div
              key={id}
              className={`${bg} w-screen h-full flex flex-col xl:flex-row gap-16 `}
            >
              {/* {TEXT CONTAINER} */}
              <div className="h-1/2  xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center ">
                <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                  {description}
                </h2>
                <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                  {title}
                </h1>
                <Link href={url}>
                  <Button>SHOP NOW</Button>
                </Link>
              </div>
              {/* {IMAGE CONTAINER} */}
              <div className="h-1/2 xl:w-1/2 xl:h-full relative ">
                <Image
                  src={img}
                  alt="slider-image"
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute m-auto bottom-8 left-1/2 flex  space-x-4">
          {SLIDES.map(({ id }: { id: number }, index: number) => (
            <div
              key={id}
              className={`size-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center
                ${current === index ? "scale-150" : ""}`}
              onClick={() => setCurrent(index)}
            >
              {current === index && (
                <div className="w-[6px] h-[6px] bg-gray-600 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
