import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { ShoppingBagOutlined, FavoriteBorderRounded, ReceiptLongOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import LogInSignupModal from "./logInSignupModal";
import { useAuth } from "@/context/AuthContext";
import Drawer from "@mui/material/Drawer";
import SideNav from "./sideNav";
import { Close, Menu } from "@mui/icons-material";
import Search from "./search";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const NavBar = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisibilty] = useState(false);
  const { isLoggedIn } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [info, setInfo] = useState("");

  useEffect(() => {
    const isSessionExpired = localStorage.getItem("isSessionExpired") == "true";
    if (!isSessionExpired) return;
    setInfo("Your session is expired please login again.");
    localStorage.removeItem("isSessionExpired");
  }, []);

  useEffect(() => { setOpenDrawer(false); }, [router.asPath]);

  return (
    <>
      <div className="zeal-nav">
        <Link href="/" className="zeal-nav-logo" aria-label="Zeal Wear home">
          <Image src={logo} alt="" />
        </Link>
        <nav className="zeal-nav-links" aria-label="Shop navigation">
          <Link href="/products">Shop</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#about">Our story</Link>
        </nav>
        <Search />
        <div className="zeal-nav-actions">
          {!isLoggedIn && (
            <button
              className="rounded-full bg-primary px-7 py-2 text-sm font-medium tracking-wide text-white shadow-card transition-all duration-200 ease-smooth hover:bg-primary-700 hover:shadow-card-hover"
              onClick={() => setModalVisibilty(true)}
            >
              Login
            </button>
          )}
          <button
            aria-label="Shopping bag"
            className={`transition-transform duration-150 ease-smooth hover:scale-110 hover:text-accent ${
              isLoggedIn ? "" : "max-sm:hidden"
            }`}
            onClick={() =>
              isLoggedIn ? router.push("/cart") : setModalVisibilty(true)
            }
          >
            <ShoppingBagOutlined aria-hidden="true" />
          </button>
          <button
            aria-label="Wishlist"
            className={`transition-transform duration-150 ease-smooth hover:scale-110 hover:text-accent ${
              isLoggedIn ? "" : "max-sm:hidden"
            }`}
            onClick={() => router.push("/wishlist")}
          >
            <FavoriteBorderRounded aria-hidden="true" />
          </button>
          <button
            aria-label="My orders"
            className={`transition-transform duration-150 ease-smooth hover:scale-110 hover:text-accent ${
              isLoggedIn ? "" : "max-sm:hidden"
            }`}
            onClick={() =>
              isLoggedIn ? router.push("/my-orders") : setModalVisibilty(true)
            }
          >
            <ReceiptLongOutlined aria-hidden="true" />
          </button>
          {(<button
              aria-label="Open navigation menu" aria-expanded={openDrawer} aria-controls="store-menu"
              onClick={() => setOpenDrawer(!openDrawer)}
              className="store-menu-trigger"
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
        <div className="store-menu" id="store-menu">
          <div className="store-menu-heading">Menu<button aria-label="Close menu" onClick={() => setOpenDrawer(false)}><Close /></button></div>
          <nav aria-label="Mobile shop navigation">
            {[["Shop all", "/products"], ["Categories", "/#categories"], ["Our story", "/#about"], ["Contact us", "/contact-us"]].map(([label, href]) => <Link key={href} href={href} onClick={() => setOpenDrawer(false)}>{label}</Link>)}
          </nav>
          {isLoggedIn ? <SideNav isDrawer /> : <button className="store-menu-login" onClick={() => { setOpenDrawer(false); setModalVisibilty(true); }}>Sign in or create an account</button>}
        </div>
      </Drawer>
      <Snackbar
        open={!!info}
        autoHideDuration={6000}
        onClose={() => setInfo("")}
      >
        <Alert onClose={() => setInfo("")} severity="info">
          {info}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NavBar;
