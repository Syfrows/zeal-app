import Layout from "@/components/layout";
import { CheckCircle } from "@mui/icons-material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const product = {
  image: null,
  name: "Men cotton jacket",
  size: "M",
  colour: "White",
  price: 170,
  salePrice: 150,
  quantity: 1,
};
const products = new Array(3).fill(product).map((e, index) => {
  return {
    ...product,
    image: `https://picsum.photos/id/${index}/360/300`,
  };
});

const Product = ({ item, isReturn }: any) => {
  const currency = "₹";
  return (
    <div className="flex border-2 border-slate-400 p-4 max-sm:flex-col max-sm:items-center">
      <Image src={item.image} alt={item.name} height={205} width={266} />
      <div className="mx-8 space-y-4">
        <p className="text-2xl font-semibold">{item.name}</p>
        <div className="flex">
          <div className="space-y-4">
            <p>
              Size: <span className="font-bold">{item.size}</span>
            </p>
            <p>
              Colour: <span className="font-bold">{item.colour} </span>
              <span className="ms-11">Quantity: {item.quantity}</span>
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
              <span className="ms-4 text-green-500">
                {`You saved ₹${item.price - item.salePrice}`}
              </span>
            </p>
            {isReturn && <p>Return till 14th May</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const Confirmation = () => {
  const searchParams = useSearchParams();
  const isReturn = searchParams.get("isReturn");
  const router = useRouter();
  return (
    <Layout>
      <div className="flex flex-col py-12 lg:px-32">
        <p className="text-center text-2xl font-semibold">
          <span className="me-4 text-green-500">
            <CheckCircle />
          </span>
          {isReturn
            ? `Thank you, Your return order has been scheduled!`
            : `Thank you, Your order has been placed!`}
        </p>
        <div className="my-4 space-y-4">
          {products.map((product, index) => (
            <div key={index}>
              <Product item={product} isReturn={isReturn} />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mt-4 bg-primary px-6 py-3 font-semibold text-white"
            onClick={() => router.push("/")}
          >
            CONTINUE SHOPPING
          </button>
          <p className="my-4 text-center font-semibold">
            By placing order you’re agreeing to our
            <span className="text-red-400"> Terms and Conditions</span> and
            <span className="text-red-400"> Privacy Policy</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
