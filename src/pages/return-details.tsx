import Layout from "@/components/layout";
import { formatPrice } from "@/helpers/helper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const orderDetails = {
  image: "https://picsum.photos/360/300",
  orderId: "98332",
  numberOfItems: 1,
  amount: 799,
  returnBy: "14th May",
};

const responses = [
  { label: "Damaged product" },
  { label: "Defective product" },
  { label: "Size/Fitting issue" },
  { label: "Different from website description" },
  { label: "Other" },
];

const ReturnDetails = () => {
  const [selectedResponse, setSelectedResponse] = useState<any>(null);
  const router = useRouter();
  return (
    <Layout>
      <div className="flex flex-col justify-center py-8 lg:flex-row lg:px-16">
        <div className="flex flex-grow flex-col border-2 border-gray-400 p-6 lg:flex-row">
          <Image
            src={orderDetails.image}
            alt={orderDetails.orderId}
            height={250}
            width={350}
            className="h-[250px] self-center max-lg:mb-6"
          />
          <div className="flex flex-grow flex-col lg:ms-12">
            <p className="mb-3 text-2xl font-semibold">
              ORDER #{orderDetails.orderId}
            </p>
            <p>
              {orderDetails.numberOfItems} item,{" "}
              <span className="font-bold">
                {formatPrice(orderDetails.amount)}
              </span>
            </p>
            <div className="my-6 border-t-2 border-gray-300" />
            <p className="font-semibold">Why are you returning this?</p>
            <Autocomplete
              options={responses}
              renderInput={(params) => (
                <TextField {...params} label="Choose a response" />
              )}
              onChange={(_event, value) => setSelectedResponse(value)}
              className="my-4 xl:w-1/2"
            />
            {selectedResponse?.label === "Other" && (
              <TextField
                label="Other Response"
                variant="outlined"
                className="xl:w-1/2"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center max-lg:mt-8 lg:ms-8">
          <button
            className="bg-primary px-16 py-3 font-semibold text-white"
            onClick={() => router.push("/confirmation?isReturn=true")}
          >
            Continue Return
          </button>
          <p className="my-4 font-bold text-gray-500">
            Return by {orderDetails.returnBy}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnDetails;
