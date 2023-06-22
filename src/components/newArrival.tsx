import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const NewArrival = ({ product }: any) => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });
  const router = useRouter();

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener("resize", () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  const [products, setProducts] = useState(product);

  useEffect(() => setProducts(product), [product]);

  useEffect(() => {
    if (products.length <= 0) return;
    const interval = setInterval(() => {
      const newProducts: any = [...products];
      newProducts.unshift(newProducts.pop());
      setProducts([...newProducts]);
    }, 10000);

    return () => clearInterval(interval);
  }, [products]);

  const middleIndex = screenSize.width < 640 ? 1 : 2;

  return (
    <div className="mb-16 flex flex-col items-center text-center">
      <p className=" mb-5 text-4xl font-semibold">New Arrival</p>
      <p>
        We too believe that shopping is relaxing is thing as whenever I get too
        stressed or <br /> tensed. I often go for shopping.
      </p>
      <div className="my-16 flex">
        {products
          .slice(0, screenSize.width < 640 ? 3 : 5)
          .map((product: any, index: any) => (
            <div
              key={index}
              style={
                index != middleIndex
                  ? {
                      clipPath: `${
                        index < middleIndex
                          ? "polygon(0 0, 100% 5%, 100% 95%, 0% 100%)"
                          : "polygon(0 5%, 100% 0, 100% 100%, 0 95%)"
                      }`,
                    }
                  : {}
              }
              className={`inset-0 transition-opacity duration-1000 ease-in-out ${
                index == middleIndex
                  ? "z-10 scale-110"
                  : index < middleIndex
                  ? "translate-x-6"
                  : "-translate-x-6"
              }`}
              onClick={() => router.push("/product-details")}
            >
              <Image
                src={product.productAsset.preview}
                alt={product.productVariantName}
                className="h-[500px] w-[300px]"
                width={300}
                height={500}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewArrival;
