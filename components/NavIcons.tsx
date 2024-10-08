/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import Cookies from "js-cookie";
import { LogOut, UserPen } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface IProps {}

const NavIcons = ({}: IProps) => {
  const [open, setOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = wixClient.auth.loggedIn();
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, [isHomePage, wixClient.auth]);

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    Cookies.remove("refreshToken");
    router.push(logoutUrl);
  };

  return (
    <>
      <div className="flex items-center space-x-4 xl:space-x-6 relative">
        {/* USER */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isLoggedIn ? (
              <Avatar className="cursor-pointer" onClick={handleProfile}>
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
                onClick={handleProfile}
              />
            )}

            {/* <Image
              className="cursor-pointer"
              src="/profile.png"
              alt="profile"
              width={22}
              height={22}
              onClick={handleProfile} */}
            {/* /> */}
          </DropdownMenuTrigger>
          {open && (
            <DropdownMenuContent className="w-28">
              <Link href="/">
                <DropdownMenuItem>
                  <UserPen className="mr-2 size-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
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
