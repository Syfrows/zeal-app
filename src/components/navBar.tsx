import Image from "next/image";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { AccountIcon, CartIcon, SearchIcon, WishListIcon } from "./icons";
import { useRouter } from "next/router";
import LogInSignupModal from "./logInSignupModal";

const NavBar = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisibilty] = useState(false);

  return (
    <>
      <div className="flex h-16 justify-between bg-white px-1 shadow sm:px-6">
        <div className="my-1 aspect-[147/122]" onClick={() => router.push("/")}>
          <Image src={logo} alt="RelaxZeal" />
        </div>
        <div className="my-3 hidden border-2 border-primary sm:flex lg:min-w-[500px]">
          <input
            type="text"
            placeholder="Search Products..."
            className="flex-1 px-4 py-1 focus:outline-none"
          />
          <button className="flex w-10 items-center justify-center bg-primary">
            <SearchIcon width="20" height="18" color="white" />
          </button>
        </div>
        <div className="item-center my-3 flex space-x-3 sm:space-x-6">
          <button
            className="rounded-md bg-primary px-6 text-white "
            onClick={() => setModalVisibilty(true)}
          >
            Login
          </button>
          <button className="sm:hidden">
            <SearchIcon width="20" height="18" color="black" />
          </button>
          <button onClick={() => router.push("/cart")}>
            <CartIcon width="23" height="19" color="black" />
          </button>
          <button onClick={() => router.push("/wishlist")}>
            <WishListIcon width="25" height="19" color="black" />
          </button>
          <button onClick={() => router.push("/my-orders")}>
            <AccountIcon width="20" height="19" color="black" />
          </button>
        </div>
      </div>
      <LogInSignupModal
        isVisible={isModalVisible}
        setVisibilty={setModalVisibilty}
      />
    </>
  );
};

export default NavBar;
