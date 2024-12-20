"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Define the ProductType interface
interface ProductType {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number; // Optional quantity field
}

const Navbar = () => {
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const fetchWishlist = async () => {
    if (user) {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setWishlist(data.wishlist || []);
      } catch (err) {
        console.log("[wishlist_FETCH]", err);
      }
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  // const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image
          src="/th.png"
          alt="Website logo"
          width={130}
          height={100}
          className="lg:w-[50%]"
        />
      </Link>

      <div className="flex gap-4 text-base-bold max-lg:hidden w-[30%]">
        <Link
          href="/"
          className={`hover:text-pink-600 ${pathname === "/" && "text-pink-600"}`}
        >
          Home
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-pink-600 ${pathname === "/orders" && "text-pink-600"}`}
        >
          Orders
        </Link>
        <Link href="/about" className="hover:text-pink-600">
          About us
        </Link>
        <Link href="/contact" className="hover:text-pink-600">
          Contact us
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4 bg-gray-100 p-0.3 rounded-md flex-1">
        <input
          className="flex-1 bg-transparent outline-none w-[80%] pl-5 mr-5"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Image
            src="/search.png"
            alt="Search icon"
            width={16}
            height={16}
            className="mr-2"
          />
        </button>
      </div>

      <div className="relative flex gap-3 items-center">

        <Link href={user ? "/wishlist" : "/sign-in"} className="flex items-center gap-2 relative px-2 py-1 max-md:hidden">
          <Image src="/hart.png" alt="Wishlist" width={28} height={28} />
          <p className="flex justify-center items-center bg-pink-500 border rounded-full absolute w-5 h-5 text-white -top-1 -right-2">
            {wishlist.length} {/* Counter value */}
          </p>
        </Link>


        <Link
          href="/cart"
          className="flex items-center gap-3 relative px-2 py-1 max-md:hidden"
        >
          <ShoppingCart />
          <p className="flex justify-center items-center bg-pink-500 border rounded-full absolute w-5 h-5 text-white -top-2 -right-2">
            {cart.cartItems.length}
          </p>
        </Link>

        {/* <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
          aria-expanded={dropdownMenu}
          aria-controls="dropdown-menu"
        /> */}

        {/* {dropdownMenu && (
          <div
            id="dropdown-menu"
            className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden"
          >
            <Link href="/" className="hover:text-pink-600">
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-pink-600"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-pink-600"
            >
              Orders
            </Link>
            <Link href="/about" className="hover:text-pink-600">
              About us
            </Link>
            <Link href="/contact" className="hover:text-pink-600">
              Contact us
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )} */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <GiHamburgerMenu className="text-whitetext text-[24px] cursor-pointer bg-white" />
            </SheetTrigger>
            <SheetContent className="sheet-animation">
              <ul className="flex flex-col gap-[10px] font-medium text-[16px]">
                <li>
                  <Link href="/" className="hover:text-pink-600 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={user ? "/wishlist" : "/sign-in"}
                    className="hover:text-pink-600 transition-colors duration-300"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href={user ? "/orders" : "/sign-in"}
                    className="hover:text-pink-600 transition-colors duration-300"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-pink-600 transition-colors duration-300">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-pink-600 transition-colors duration-300">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <ShoppingCart />
                    <p className="text-base-bold">Cart ({cart?.cartItems?.length || 0})</p>
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>


        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
