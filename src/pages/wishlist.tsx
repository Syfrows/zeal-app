import ServiceNotice from "@/components/serviceNotice";
import Image from "next/image";
import wishlist from "../assets/wishlist.png";
import Layout from "@/components/layout";
import { useState } from "react";
import LogInSignupModal from "@/components/logInSignupModal";
import { useRouter } from "next/router";
import { formatPrice } from "@/helpers/helper";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_WISHLIST, TOGGLE_WISHLIST } from "@/graphql/wishlist";
import { Favorite } from "@/__generated__/graphql";
import { ADD_ITEM_TO_ORDER } from "@/graphql/orderWorkflow";
import placeHolder from "../assets/placeHolder.png";

const WishlistItem = ({
  item,
  refetch,
}: {
  item: Favorite;
  refetch: () => void;
}) => {
  const [removeFromWishlist] = useMutation(TOGGLE_WISHLIST);
  const [addToCart] = useMutation(ADD_ITEM_TO_ORDER);
  const product = item.productVariant;

  const findProductOption = (optionType: string) => {
    return (
      product?.options.find((x) => x.group.name.toLowerCase() === optionType)
        ?.name || "NA"
    );
  };

  const onRemoveWishListItem = () => {
    removeFromWishlist({
      variables: { productVariantId: product?.id || "" },
      onCompleted: onWishlistItemRemoved,
    });
  };

  const onAddToCart = () => {
    addToCart({
      variables: { productVariantId: product?.id || "", quantity: 1 },
      onCompleted: onRemoveWishListItem,
    });
  };

  const onWishlistItemRemoved = () => {
    refetch();
  };

  return (
    <div className="flex flex-col border-2 border-slate-400 p-4 sm:flex-row">
      <Image
        src={product?.product?.featuredAsset?.preview || placeHolder}
        alt={product?.name || ""}
        height={220}
        width={220}
        className="aspect-square self-center max-sm:mb-4"
      />
      <div className="mx-2 space-y-4 sm:mx-8">
        <p className="text-2xl font-semibold">{product?.name}</p>
        <p>
          Size: <span className="font-bold">{findProductOption("size")}</span>
        </p>
        <p>
          Colour:{" "}
          <span className="font-bold">{findProductOption("color")}</span>
        </p>
        <p>
          Price:{" "}
          <span className="font-bold text-slate-500 line-through">
            {formatPrice(product?.customFields?.MRP || 0)}
          </span>{" "}
          <br />
          <span className="ms-11 font-bold">
            {formatPrice(product?.priceWithTax)}
          </span>
        </p>
        <div className="flex space-x-8">
          <button
            className="rounded-xl border-2 border-slate-500 px-8 py-2 font-semibold"
            onClick={onRemoveWishListItem}
          >
            Remove
          </button>
          <button
            className="rounded-xl border-2 border-slate-500 px-8 py-2 font-semibold"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const WishList = () => {
  const { isLoggedIn } = useAuth();
  const [isModalVisible, setModalVisibilty] = useState(false);
  const router = useRouter();
  const { data, error, loading, refetch } = useQuery(GET_WISHLIST);
  const products = data?.authenticatedUser?.favorites.items || [];

  if (error)
    return (
      <Layout>
        <ServiceNotice message="Your wishlist is temporarily unavailable." />
      </Layout>
    );
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
                <WishlistItem item={item as Favorite} refetch={refetch} />
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
