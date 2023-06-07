import { useRouter } from "next/router";

export enum Page {
  MyOrders = "my-orders",
  WishList = "wishlist",
  ReturnRequests = "my-orders?isReturns=true",
  AccountInformation = "account-information",
  Address = "address",
}

const SideNav = () => {
  const router = useRouter();
  const name = "Kartik Chate";
  const getClassName = (page: Page) => {
    const route = router.asPath;
    if (page === Page.ReturnRequests) {
      return route.includes("isReturns=true")
        ? "mb-2 cursor-pointer text-xl font-bold text-sky-700"
        : "mb-2 cursor-pointer";
    }
    if (page === Page.MyOrders) {
      return !route.includes("isReturns=true") && route.includes(page)
        ? "mb-2 cursor-pointer text-xl font-bold text-sky-700"
        : "mb-2 cursor-pointer";
    }
    return route.includes(page)
      ? "mb-2 cursor-pointer text-xl font-bold text-sky-700"
      : "mb-2 cursor-pointer";
  };
  return (
    <div className="hidden sm:flex">
      <div>
        <p className="text-2xl font-semibold">Account</p>
        <p className="font-bold text-gray-500">{name}</p>
        <div className="mb-4 mt-2 border-t-2 border-gray-300" />
        <p
          className={getClassName(Page.MyOrders)}
          onClick={() => router.push("/my-orders")}
        >
          My Orders
        </p>
        <p
          className={getClassName(Page.WishList)}
          onClick={() => router.push("/wishlist")}
        >
          Manage Wishlist
        </p>
        <p
          className={getClassName(Page.ReturnRequests)}
          onClick={() => router.push("/my-orders?isReturns=true")}
        >
          View Return Request
        </p>
        <div className="my-4 border-t-2 border-gray-300" />
        <p
          className={getClassName(Page.AccountInformation)}
          onClick={() => router.push("/account-information")}
        >
          Account Information
        </p>
        <p
          className={getClassName(Page.Address)}
          onClick={() => router.push("/address")}
        >
          My Addresses
        </p>
        <p className="mb-2 cursor-pointer" onClick={() => router.push("/")}>
          Logout
        </p>
      </div>
      <div className="mx-10 border-s-2 border-gray-300" />
    </div>
  );
};

export default SideNav;
