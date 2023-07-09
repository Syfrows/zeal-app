import Layout from "@/components/layout";
import LogInSignupModal from "@/components/logInSignupModal";
import ProductAddedModal, { Product } from "@/components/productAddedModal";
import { useAuth } from "@/context/AuthContext";
import { ADD_ITEM_TO_ORDER } from "@/graphql/orderWorkflow";
import { PRODUCT_DETAILS } from "@/graphql/productDetails";
import { formatPrice } from "@/helpers/helper";
import { useMutation, useQuery } from "@apollo/client";
import { Add, KeyboardArrowDown } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import { ActiveOrderFragment } from "@/__generated__/graphql";

const ProductDetails = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalVisible, setModalVisiblity] = useState(false);
  const productName = useSearchParams().get("name");
  const productVairentName = useSearchParams().get("variant");
  const [isLoginModalVisible, setLoginModalVisibilty] = useState(false);
  const { isLoggedIn } = useAuth();
  const [quantity, setQuantity] = useState(1);

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

  useEffect(
    () => setSelectedOptions(selectedVariant?.options || []),
    [selectedVariant?.options]
  );

  useEffect(() => {
    if (!addToCartData) return;
    setModalVisiblity(true);
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
    image: product.assets[0].source,
    name: product.name,
    size: findSelectedOption("size"),
    colour: findSelectedOption("color"),
    price: selectedVariant.price,
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
    router.replace(
      `/product-details?name=${productName}&variant=${variant?.name}`
    );
    setSelectedOptions(newOptions);
    setSelectedImage(0);
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col items-center sm:w-1/2">
          <Image
            src={productAssest?.[selectedImage]?.source ?? ""}
            alt={productAssest?.[selectedImage]?.name ?? ""}
            height={569}
            width={436}
          />
          <div className="my-5 flex space-x-4">
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
                  />
                )
              );
            })}
          </div>
        </div>
        <div className="flex flex-col space-y-4 sm:w-1/2">
          <p className="text-3xl font-semibold">{selectedVariant.name}</p>
          <div className="flex items-center space-x-2">
            <Rating
              name="read-only"
              value={product.customFields?.reviewRating}
              precision={0.1}
              readOnly
            />
            <p className="text-xs">{`(${product.customFields?.reviewCount} customer review)`}</p>
          </div>
          <p>{product.description}</p>
          <p className="text-red-400 underline">View more detail</p>
          <div className="flex flex-col rounded-xl border-2 border-gray-200 p-6 max-sm:space-y-4 sm:flex-row sm:space-x-8 sm:self-start">
            <div>
              <p className="text-red-400">
                {Math.round(
                  ((selectedVariant.priceWithTax - selectedVariant.price) /
                    selectedVariant.priceWithTax) *
                    100
                )}
                % off!{" "}
                <span className="text-2xl font-medium text-black">
                  {formatPrice(selectedVariant.price)}
                </span>
              </p>
              <p>
                M.R.P:{" "}
                <span className="line-through">
                  {formatPrice(selectedVariant.priceWithTax)}
                </span>
              </p>
            </div>
            <div>
              <Select
                className="rounded-xl border-gray-500 bg-gray-100 p-4"
                value={quantity}
                input={<InputBase />}
                endAdornment={
                  <InputAdornment position="end">
                    <span>| Pcs</span>
                  </InputAdornment>
                }
                IconComponent={() => (
                  <InputAdornment position="end">
                    <KeyboardArrowDown />
                  </InputAdornment>
                )}
                onChange={(event) => setQuantity(Number(event.target.value))}
              >
                {Array(6)
                  .fill(0)
                  .map((_value, index) => {
                    if (index === 0) return;
                    return (
                      <MenuItem key={index} value={index}>
                        {index}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <button
              className={`rounded-xl bg-orange-600 px-4 py-3 font-bold text-white ${
                addToCartLoading && "opacity-60"
              }`}
              onClick={onAddToCart}
              disabled={addToCartLoading}
            >
              {addToCartLoading ? (
                <CircularProgress color="inherit" size={16} className="me-2" />
              ) : (
                <Add />
              )}
              Add to Cart
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
            <p>
              <span className="text-blue-400">Size Chart </span>{" "}
              <KeyboardArrowDown />
            </p>
            <input
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
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold">Description</p>
            <div className="my-4 border-t-2 border-gray-300" />
            <p className="my-2 font-medium">Origins</p>
            <p>{product.description}</p>
            <p className="mb-2 mt-8 font-medium">Size Chart</p>
            <p>Measurements and chart will be attached</p>
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
            <div className="flex">
              <p className="w-1/4 text-gray-500">Material:</p>
              <p className="w-3/4">100% Cotton</p>
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
    </Layout>
  );
};

export default ProductDetails;
