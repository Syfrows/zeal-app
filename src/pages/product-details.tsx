import Layout from "@/components/layout";
import LogInSignupModal from "@/components/logInSignupModal";
import ProductAddedModal, { Product } from "@/components/productAddedModal";
import { useAuth } from "@/context/AuthContext";
import { ADD_ITEM_TO_ORDER } from "@/graphql/orderWorkflow";
import { PRODUCT_DETAILS } from "@/graphql/productDetails";
import { StockLevel, discount, formatPrice } from "@/helpers/helper";
import { useMutation, useQuery } from "@apollo/client";
import {
  Add,
  ArrowBackIos,
  ArrowForwardIos,
  KeyboardArrowDown,
  Remove,
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ActiveOrderFragment, ErrorResult } from "@/__generated__/graphql";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import placeHolder from "../assets/placeHolder.png";
import SizeChartModal from "@/components/sizeChartModal";

const ProductDetails = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalVisible, setModalVisiblity] = useState(false);
  const productName = useSearchParams().get("name");
  const productVairentName = useSearchParams().get("variant");
  const [isLoginModalVisible, setLoginModalVisibilty] = useState(false);
  const [isSizeChartModalVisible, setSizeChartModalVisibilty] = useState(false);
  const { isLoggedIn } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [info, setInfo] = useState("");
  const [moreDescription, setMoreDescription] = useState(false);

  const { loading, error, data } = useQuery(PRODUCT_DETAILS, {
    variables: { slug: productName },
  });

  const [addToCart, { data: addToCartData, loading: addToCartLoading }] =
    useMutation(ADD_ITEM_TO_ORDER);

  const product = data?.product;
  const selectedVariant = product?.variants?.find(
    (x) => x.name === productVairentName
  );
  const [selectedOptions, setSelectedOptions] = useState(
    selectedVariant?.options || []
  );
  const productAssest = product?.assets?.concat(selectedVariant?.assets ?? []);
  const productOptions = product?.optionGroups;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isContentScrollable, setIsContentScrollable] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setIsContentScrollable(scrollWidth > clientWidth);
    }
  }, [productAssest]);

  const scrollForward = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 100;
    }
  };
  const scrollBackward = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 100;
    }
  };

  useEffect(
    () => setSelectedOptions(selectedVariant?.options || []),
    [selectedVariant?.options]
  );

  useEffect(() => {
    if (!addToCartData) return;
    addToCartData?.addItemToOrder.__typename === "Order"
      ? setModalVisiblity(true)
      : setInfo((addToCartData?.addItemToOrder as ErrorResult).message);
  }, [addToCartData]);

  if (!product || !selectedVariant) {
    return (
      <Layout>
        <p>Product Not Found</p>
      </Layout>
    );
  }

  const findSelectedOption = (optionType: string) => {
    const optionGroup = productOptions?.find(
      (x) => x.name.toLowerCase() === optionType
    );
    const selectedOption = optionGroup?.options.find((x) =>
      selectedOptions.some((y) => y.id == x.id && y.groupId === optionGroup.id)
    );
    return selectedOption?.name || "NA";
  };

  const cartData =
    addToCartData?.addItemToOrder.__typename === "Order"
      ? (addToCartData.addItemToOrder as ActiveOrderFragment)
      : null;

  const addedProduct: Product = {
    image: product.assets[0]?.source,
    name: product.name,
    size: findSelectedOption("size"),
    colour: findSelectedOption("color"),
    price: selectedVariant.priceWithTax,
    quantity: quantity,
    cartSubtotal: cartData?.subTotalWithTax,
  };

  const onAddToCart = () => {
    if (!isLoggedIn) {
      setLoginModalVisibilty(true);
      return;
    }
    addToCart({
      variables: { productVariantId: selectedVariant.id, quantity: quantity },
    });
  };

  const onProductOptionSelect = (groupId: string, optionId: string) => {
    let newOptions = selectedOptions.map((x) =>
      x.groupId === groupId ? { ...x, id: optionId } : x
    );
    let variant = product.variants.find((x) =>
      x.options.every(
        (x) => newOptions.find((y) => y.groupId === x.groupId)?.id === x.id
      )
    );
    if (!variant) {
      variant = product.variants.find((x) =>
        x.options.find((x) => x.groupId === groupId && x.id === optionId)
      );
      newOptions = variant?.options || selectedOptions;
    }
    if (!variant) {
      setInfo("Product variant not available.");
      return;
    }
    router.replace(
      `/product-details?name=${productName}&variant=${variant?.name}`
    );
    setSelectedOptions(newOptions);
    setSelectedImage(0);
  };

  const mrp = selectedVariant.customFields?.MRP || 0;
  const isItemOutOfStock = selectedVariant.stockLevel === StockLevel.OutOfStock;
  const disableAddtoCart = addToCartLoading || isItemOutOfStock;
  const rating = product.customFields?.reviewRating || 0;
  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="flex flex-col items-center sm:w-1/2">
          <Image
            src={productAssest?.[selectedImage]?.source ?? placeHolder}
            alt={productAssest?.[selectedImage]?.name ?? ""}
            height={500}
            width={500}
            className="aspect-square"
          />
          <div className="flex space-x-3 py-2 sm:px-8">
            {isContentScrollable && (
              <button onClick={scrollBackward}>
                <ArrowBackIos />
              </button>
            )}
            <div
              ref={scrollRef}
              className="my-5 flex space-x-4 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
            >
              {productAssest?.map((image, index) => {
                return (
                  index !== selectedImage && (
                    <Image
                      key={index}
                      src={image?.preview}
                      alt={image?.name}
                      height={115}
                      width={115}
                      onClick={() => setSelectedImage(index)}
                      className="aspect-square"
                    />
                  )
                );
              })}
            </div>
            {isContentScrollable && (
              <button onClick={scrollForward}>
                <ArrowForwardIos />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 sm:w-1/2">
          <p className="text-3xl font-semibold">{selectedVariant.name}</p>
          {rating !== 0 && (
            <div className="flex items-center space-x-2">
              <Rating
                name="read-only"
                value={rating}
                precision={0.1}
                readOnly
              />
              <p className="text-xs">{`(${product.customFields?.reviewCount} customer review)`}</p>
            </div>
          )}
          <p
            className={moreDescription ? "" : "line-clamp-2"}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <button
            className="text-start text-red-400 underline"
            onClick={() => setMoreDescription(!moreDescription)}
          >
            {`View ${!moreDescription ? "more" : "less"} detail`}
          </button>
          <div className="flex flex-col rounded-xl border-2 border-gray-200 p-6 max-sm:space-y-4 sm:flex-row sm:space-x-8 sm:self-start">
            <div>
              <p className="text-red-400">
                {discount(mrp, selectedVariant.priceWithTax) > 0
                  ? `${discount(mrp, selectedVariant.priceWithTax)} % off! `
                  : ""}
                <span className="text-2xl font-medium text-black">
                  {formatPrice(selectedVariant.priceWithTax)}
                </span>
              </p>
              <p>
                M.R.P: <span className="line-through">{formatPrice(mrp)}</span>
              </p>
            </div>
            <div>
              <p className="rounded-xl border-gray-500 bg-gray-100 p-5">
                Quantity:
                <button
                  className="ms-2"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <Remove />
                </button>
                <span className="border-2 border-slate-300 px-2 py-1">
                  <input
                    onChange={(e) => setQuantity(Number(e.currentTarget.value))}
                    value={quantity}
                    type="number"
                    className="w-12 text-center [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Add />
                </button>
              </p>
            </div>
            <button
              className={`rounded-xl bg-orange-600 px-4 py-3 font-bold text-white ${
                disableAddtoCart && "opacity-60"
              }`}
              onClick={onAddToCart}
              disabled={disableAddtoCart}
            >
              {!isItemOutOfStock &&
                (addToCartLoading ? (
                  <CircularProgress
                    color="inherit"
                    size={16}
                    className="me-2"
                  />
                ) : (
                  <Add />
                ))}
              {isItemOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
          {productOptions?.map((optionGroup, index) => {
            const selectedId = selectedOptions.find(
              (x) => x.groupId === optionGroup.id
            )?.id;
            return (
              <div
                key={index}
                className="flex flex-col space-y-4 self-start rounded-xl border-2 border-gray-200 px-6 py-4"
              >
                <p>
                  {optionGroup.name.toUpperCase()}: Click to select{" "}
                  {optionGroup.name}
                </p>
                <div>
                  {optionGroup.options.map((option) => (
                    <button
                      key={option.id}
                      className={`mb-2 me-4 rounded-xl px-8 py-2 ${
                        option.id === selectedId
                          ? `bg-orange-600 text-white`
                          : `border-2 border-gray-500 text-black`
                      }`}
                      onClick={() =>
                        onProductOptionSelect(optionGroup.id, option.id)
                      }
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="space-y-3">
            <button onClick={() => setSizeChartModalVisibilty(true)}>
              <span className="text-blue-400">Size Chart </span>{" "}
              <KeyboardArrowDown />
            </button>
            {/* <input
              type="text"
              placeholder="Enter Postal Code"
              className="flex-1 rounded-lg border-2 border-gray-400 px-4 py-1 focus:outline-none"
            />
            <p className="text-gray-500">
              Delivery: <span className="text-black">in {2} days</span>
            </p>
            <p className="text-gray-500">
              Delivery charges:{" "}
              <span className="font-bold text-black">{formatPrice(15000)}</span>
            </p> */}
          </div>
          <div>
            <p className="text-xl font-semibold">Description</p>
            <div className="my-4 border-t-2 border-gray-300" />
            <p
              dangerouslySetInnerHTML={{
                __html: product.customFields?.Info || product.description,
              }}
            />
          </div>
          <div className="space-y-4 py-12">
            <div className="flex">
              <p className="w-1/4 text-gray-500">SKU:</p>
              <p className="w-3/4">{selectedVariant.sku}</p>
            </div>
            <div className="flex">
              <p className="w-1/4 text-gray-500">Category:</p>
              <p className="w-3/4">
                {product.collections.map((x) => x.name).join(", ")}
              </p>
            </div>
            <div className="flex">
              <p className="w-1/4 text-gray-500">Stock:</p>
              <p className="w-3/4">{selectedVariant.stockLevel}</p>
            </div>
          </div>
        </div>
      </div>
      <ProductAddedModal
        isVisible={isModalVisible}
        setVisibilty={setModalVisiblity}
        product={addedProduct}
      />
      <LogInSignupModal
        isVisible={isLoginModalVisible}
        setVisibilty={setLoginModalVisibilty}
      />
      <Snackbar
        open={!!info}
        autoHideDuration={6000}
        onClose={() => setInfo("")}
      >
        <Alert onClose={() => setInfo("")} severity="info">
          {info}
        </Alert>
      </Snackbar>
      <SizeChartModal
        isVisible={isSizeChartModalVisible}
        setVisibility={setSizeChartModalVisibilty}
      />
    </Layout>
  );
};

export default ProductDetails;
