"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IProps {}

const Menu = ({}: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <Image
          className="cursor-pointer"
          src="/menu.png"
          onClick={() => setOpen((prev) => !prev)}
          width={28}
          height={28}
          alt="menu button"
        />
      </div>
      {open && (
        <>
          <nav className="absolute bg-black text-white left-0 top-20 flex flex-col items-center justify-center space-y-8 w-full h-[calc(100vh-80px)] text-xl z-10 ">
            <Link href="/">HomePage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Logout</Link>
            <Link href="/">Cart(1)</Link>
          </nav>
        </>
      )}
    </>
  );
};

export default Menu;
