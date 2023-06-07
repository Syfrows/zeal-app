import Image from "next/image";
import wishlist from "../assets/wishlist.png";
import Layout from "@/components/layout";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import LogInSignupModal from "@/components/logInSignupModal";
import { useRouter } from "next/router";

const WishlistItem = ({ item }: any) => {
  const currency = "₹";
  return (
    <div className="flex border-2 border-slate-400 p-4">
      <Image src={item.image} alt={item.name} height={205} width={266} />
      <div className="mx-8 space-y-4">
        <p className="text-2xl font-semibold">{item.name}</p>
        <p>
          Size: <span className="font-bold">{item.size}</span>
        </p>
        <p>
          Colour: <span className="font-bold">{item.colour}</span>
        </p>
        <p>
          Price:{" "}
          <span className="font-bold text-slate-500 line-through">
            {currency}
            {item.price}
          </span>{" "}
          <br />
          <span className="ms-11 font-bold">
            {currency}
            {item.salePrice}
          </span>
        </p>
        <div className="flex space-x-8">
          <button className="rounded-xl border-2 border-slate-500 px-8 py-2 font-semibold">
            Remove
          </button>
          <button className="rounded-xl border-2 border-slate-500 px-8 py-2 font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const WishList = () => {
  const searchParams = useSearchParams();
  const isLoggedIn = searchParams.get("l");
  const isEmpty = searchParams.get("e");
  const [isModalVisible, setModalVisibilty] = useState(false);
  const router = useRouter();

  const product = {
    image: null,
    name: "Men cotton jacket",
    size: "M",
    colour: "White",
    price: 170,
    salePrice: 150,
  };
  const products = new Array(isEmpty ? 3 : 0).fill(product).map((e, index) => {
    return {
      ...product,
      image: `https://picsum.photos/id/${index}/360/300`,
    };
  });

  return (
    <Layout>
      <div className="flex flex-col items-center justify-items-center space-y-8 py-4">
        {products.length === 0 ? (
          <>
            <Image src={wishlist} width={642} height={462} alt={"wishlist"} />
            <p className="text-4xl font-bold text-gray-500">
              {isLoggedIn
                ? "Your Wishlist is Empty"
                : "Login to Add/View Wishlist"}
            </p>
            {isLoggedIn && products.length == 0 && (
              <p>Save your favourite products here to buy later.</p>
            )}
          </>
        ) : (
          <div className=" space-y-8">
            <p className="text-2xl font-semibold">Wishlist</p>
            {products.map((item, index) => (
              <div key={index}>
                <WishlistItem item={item} />
              </div>
            ))}
          </div>
        )}
        {isLoggedIn ? (
          <button
            className="bg-primary px-24 py-4 text-2xl font-bold text-white"
            onClick={() => router.push("/")}
          >
            CONTINUE SHOPPING
          </button>
        ) : (
          <button
            className="bg-primary px-24 py-4 text-2xl font-bold text-white"
            onClick={() => setModalVisibilty(true)}
          >
            LOGIN/SIGN UP
          </button>
        )}
      </div>
      <LogInSignupModal
        isVisible={isModalVisible}
        setVisibilty={setModalVisibilty}
      />
    </Layout>
  );
};

export default WishList;
