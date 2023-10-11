import Image from "next/image";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { AccountIcon, CartIcon, SearchIcon, WishListIcon } from "./icons";
import { useRouter } from "next/router";
import LogInSignupModal from "./logInSignupModal";
import { useAuth } from "@/context/AuthContext";
import Drawer from "@mui/material/Drawer";
import SideNav from "./sideNav";
import { Menu } from "@mui/icons-material";
import Search from "./search";

const NavBar = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisibilty] = useState(false);
  const { isLoggedIn } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <div className="flex h-16 justify-between bg-white px-1 shadow sm:px-6">
        <div className="my-1 aspect-[147/122]" onClick={() => router.push("/")}>
          <Image src={logo} alt="RelaxZeal" />
        </div>
        <Search />
        <div className="item-center my-3 flex space-x-3 sm:space-x-6">
          {!isLoggedIn && (
            <button
              className="rounded-md bg-primary px-6 text-white "
              onClick={() => setModalVisibilty(true)}
            >
              Login
            </button>
          )}
          <button
            onClick={() =>
              isLoggedIn ? router.push("/cart") : setModalVisibilty(true)
            }
          >
            <CartIcon width="23" height="19" color="black" />
          </button>
          <button onClick={() => router.push("/wishlist")}>
            <WishListIcon width="25" height="19" color="black" />
          </button>
          <button
            onClick={() =>
              isLoggedIn ? router.push("/my-orders") : setModalVisibilty(true)
            }
          >
            <AccountIcon width="20" height="19" color="black" />
          </button>
          {isLoggedIn && (
            <button
              onClick={() => setOpenDrawer(!openDrawer)}
              className="sm:hidden"
            >
              <Menu />
            </button>
          )}
        </div>
      </div>
      <LogInSignupModal
        isVisible={isModalVisible}
        setVisibilty={setModalVisibilty}
      />
      <Drawer
        anchor={"left"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <SideNav isDrawer={true} />
      </Drawer>
    </>
  );
};

export default NavBar;
