import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

interface IProps {}

const Navbar = ({}: IProps) => {
  return (
    <>
      <header className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* MOBILE */}
        <div className="flex md:hidden items-center justify-between h-full ">
          <Link href="/">
            <div className="text-2xl tracking-wider">LAMA</div>
          </Link>
          <Menu />
        </div>

        {/* Bigger Screens */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
          {/* LEFT */}
          <div className="w-1/3 xl:w-1/2 flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" width={24} height={24} alt="Logo" />
              <div className="text-2xl tracking-wider">LAMA</div>
            </Link>

            <nav className="hidden xl:flex items-center space-x-4">
              <Link href="/">HomePage</Link>
              <Link href="/">Shop</Link>
              <Link href="/">Deals</Link>
              <Link href="/">About</Link>
              <Link href="/">Contact</Link>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="w-2/3 xl:w-1/2 flex items-center justify-between space-x-8">
            <SearchBar />
            <NavIcons />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
