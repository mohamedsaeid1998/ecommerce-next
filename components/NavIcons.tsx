/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { LogOut, UserPen } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartModal from "./CartModal";

interface IProps {}

const NavIcons = ({}: IProps) => {
  const [open, setOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isLoggedIn = true;
  return (
    <>
      <div className="flex items-center space-x-4 xl:space-x-6 relative">
        {/* USER */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={() => setOpen(!open)}>
            {open ? (
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Image
                className="cursor-pointer"
                src="/profile.png"
                alt="profile"
                width={22}
                height={22}
              />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-28">
            {isLoggedIn && (
              <Link href="/">
                <DropdownMenuItem>
                  <UserPen className="mr-2 size-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuItem>
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* NOTIFICATION */}
        <Image
          className="cursor-pointer"
          src="/notification.png"
          alt="notification"
          width={22}
          height={22}
        />
        {/* CART */}
        <div
          className="cursor-pointer relative"
          onClick={() => setIsCartOpen((prev) => !prev)}
        >
          {" "}
          <Image src="/cart.png" alt="cart" width={22} height={22} />
          <div className="bg-redColor rounded-full flex items-center text-white justify-center  absolute -top-4 -right-4 size-6  ">
            5
          </div>
        </div>
        {isCartOpen && <CartModal />}
      </div>
    </>
  );
};

export default NavIcons;
