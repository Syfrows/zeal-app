import Layout from "@/components/layout";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Add, Remove } from "@mui/icons-material";
import { useRouter } from "next/router";

const CartItem = ({ item }: any) => {
  const currency = "₹";
  return (
    <div className="flex border-2 border-slate-400 p-4">
      <Image src={item.image} alt={item.name} height={205} width={266} />
      <div className="mx-8 space-y-4">
        <p className="text-2xl font-semibold">{item.name}</p>
        <div className="flex">
          <div className="space-y-4">
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
          </div>
          <div className="mx-8 self-center">
            <p className="mb-6 space-x-2">
              Quantity:
              <button className="ms-2">
                <Remove />
              </button>
              <span className="border-2 border-slate-300 px-2 py-1">
                {item.quantity}
              </span>
              <button>
                <Add />
              </button>
            </p>
          </div>
        </div>
        <div className="flex space-x-8">
          <button className="rounded-xl border-2 border-slate-500 px-8 py-2 font-semibold">
            Remove
          </button>
          <button className="rounded-xl border-2 border-slate-500 px-8 py-2 font-semibold">
            Move to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const searchParams = useSearchParams();
  const isEmpty = searchParams.get("e");
  const router = useRouter();

  const product = {
    image: null,
    name: "Men cotton jacket",
    size: "M",
    colour: "White",
    price: 170,
    salePrice: 150,
    quantity: 1,
  };
  const products = new Array(isEmpty ? 0 : 3).fill(product).map((e, index) => {
    return {
      ...product,
      image: `https://picsum.photos/id/${index}/360/300`,
    };
  });

  return (
    <Layout>
      <div className="flex flex-col items-center justify-items-center p-12">
        {products.length === 0 ? (
          <div className="w-full space-y-3">
            <p className="text-2xl font-semibold">SHOPPING CART</p>
            <p>Your cart is empty!</p>
          </div>
        ) : (
          <div>
            <p className="mb-8 text-2xl font-semibold">
              HERE’S WHAT IN YOUR CART
            </p>
            <div className="flex space-x-12">
              <div className="space-y-8">
                {products.map((item, index) => (
                  <div key={index}>
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <p className="mb-3 text-2xl font-medium">Coupon and Vouchers</p>
                <p className="mb-2">Discount Coupon Code:</p>
                <span>
                  <input
                    type="text"
                    placeholder="Enter your coupon code here."
                    className="me-3 w-60 rounded-lg border-2 border-primary px-4 py-1 focus:outline-none"
                  />
                  <button className="font-semibold text-red-500">APPLY</button>
                </span>
                <div className="mb-6 mt-4 w-72 space-y-3">
                  <p className="font-semibold">Your Order Summary</p>
                  <div className=" border-[1px] border-gray-500" />
                  <div className="flex px-2 text-end">
                    <p className="w-1/2">Sub-Total:</p>
                    <p className="w-1/2">RS. 949.00</p>
                  </div>
                  <div className="border-[1px] border-gray-500" />
                  <div className="flex px-2 text-end">
                    <p className="w-1/2">Total:</p>
                    <p className="w-1/2">RS. 949.00</p>
                  </div>
                  <div className="border-[1px] border-gray-500" />
                </div>
                <button
                  className="w-72 bg-primary py-4 font-semibold text-white"
                  onClick={() => router.push("/address")}
                >
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
