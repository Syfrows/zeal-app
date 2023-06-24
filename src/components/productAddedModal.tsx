import { formatPrice } from "@/helpers/helper";
import { Close, CheckCircle } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/router";

const product = {
  image: "https://picsum.photos/360/300",
  name: "Men cotton jacket",
  size: "M",
  colour: "White",
  price: 170,
  salePrice: 150,
  quantity: 1,
  cartSubtotal: 1499,
};

const ProductAddedModal = ({ isVisible, setVisibilty }: any) => {
  const router = useRouter();
  return (
    <Modal
      open={isVisible}
      onClose={() => setVisibilty(false)}
      className="overflow-auto"
    >
      <div className="mt-16 flex justify-center">
        <div className="bg-white">
          <div className="flex items-center justify-end bg-primary px-8 py-4">
            <button className="text-white" onClick={() => setVisibilty(false)}>
              <Close />
            </button>
          </div>
          <div className="p-8">
            <div className="flex flex-col sm:flex-row">
              <Image
                src={product.image}
                alt={product.name}
                height={205}
                width={266}
                className="self-center max-sm:mb-6"
              />
              <div className="space-y-3 sm:px-12">
                <p className="text-2xl font-semibold">{product.name}</p>
                <p className="text-xl font-bold">
                  <span className="text-green-500">
                    <CheckCircle />
                  </span>{" "}
                  Added to cart
                </p>
                <p>
                  Size: <span className="font-bold">{product.size}</span>
                </p>
                <p>
                  Colour: <span className="font-bold">{product.colour}</span>
                </p>
                <p>
                  Quantity:{" "}
                  <span className="font-bold">{product.quantity}</span>
                </p>
                <p>
                  Price:{" "}
                  <span className="font-bold">
                    {formatPrice(product.price)}
                  </span>
                </p>
              </div>
            </div>
            <div className="my-5 border-t-2 border-gray-300" />
            <p className="mb-2 text-center">
              Cart subtotal:{" "}
              <span className="font-bold">
                {formatPrice(product.cartSubtotal)}
              </span>
            </p>
            <div className="flex justify-center">
              <button
                className="me-6 rounded-xl border-2 border-primary px-4 py-3 font-semibold"
                onClick={() => router.push("/cart")}
              >
                Go to Cart
              </button>
              <button
                className="rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white"
                onClick={() => router.push("/address")}
              >
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductAddedModal;
