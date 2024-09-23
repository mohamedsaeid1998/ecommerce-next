import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { COMPANY, HELP, PAYMENTS_IMG, SHOP, SOCIAL_ICONS } from "@/constants";
import { IFooterLinks, IPaymentsImg } from "@/interfaces";

const Footer = () => {
  return (
    <>
      <footer className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24">
        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between gap-24">
          {/* LEFT */}
          <div className="w-full md:w-1/2  lg:w-1/4 flex flex-col gap-8">
            <Link href="/" className="text-2xl tracking-wider">
              LAMA
            </Link>
            <p>
              {" "}
              3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United
              States
            </p>
            <span className="font-semibold text-base">
              muhammedsaeid98@gmail.com
            </span>
            <span className="font-semibold text-base">+20 100 072 2670</span>
            <ul className="flex gap-6">
            {SOCIAL_ICONS.map(({ id, iconSrc, alt }: IPaymentsImg) => (
                <li key={id}>
                  <Image src={`/${iconSrc}`} alt={alt} width={18} height={18} />
                </li>
              ))}
              
            </ul>
          </div>
          {/* CENTER */}
          <div className="hidden lg:flex justify-between w-1/2">
            <div className="flex flex-col justify-between">
              <h1 className="font-medium text-lg">COMPANY</h1>
              <ul className="flex flex-col gap-6">
                {COMPANY.map(({ id, title }: IFooterLinks) => (
                  <li key={id}>
                    <Link href="">{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="font-medium text-lg">SHOP</h1>
              <ul className="flex flex-col gap-6">
                {SHOP.map(({ id, title }: IFooterLinks) => (
                  <li key={id}>
                    <Link href="">{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="font-medium text-lg">HELP</h1>
              <ul className="flex flex-col gap-6">
                {HELP.map(({ id, title }: IFooterLinks) => (
                  <li key={id}>
                    <Link href="">{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            <h3 className="font-medium text-lg">SUBSCRIBE</h3>
            <p>
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
            <div className="flex">
              <Input
                type="email"
                className="bg-white rounded-none"
                placeholder="Email address"
              />
              <Button className="w-1/4 bg-redColor hover:bg-redColor text-white rounded-none">
                JOIN
              </Button>
            </div>
            <span className="font-semibold">Secure Payments</span>
            <ul className="flex justify-between">
              {PAYMENTS_IMG.map(({ id, iconSrc, alt }: IPaymentsImg) => (
                <li key={id}>
                  <Image src={`/${iconSrc}`} alt={alt} width={40} height={20} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="">
              <span className="text-gray-500 mr-4">Language</span>
              <span className="font-medium">United States | English</span>
            </div>
            <div className="">
              <span className="text-gray-500 mr-4">Currency</span>
              <span className="font-medium">$ USD</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
