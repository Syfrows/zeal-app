import Layout from "@/components/layout";
import NewAddress from "@/components/newAddress";
import {
  AddBox,
  ArrowBack,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";

const AddressDetails = ({ address, isSelected }: any) => {
  const router = useRouter();
  return (
    <div className="mb-6 mr-6 flex flex-col rounded-lg bg-gray-200 p-4 max-md:ml-6 md:w-96">
      <div className="flex space-x-3">
        {isSelected ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
        <div>
          <p className="mb-3 font-semibold">{address.name}</p>
          <p>
            Address : <span className="font-semibold">{address.address}</span>
          </p>
          <p>
            City : <span className="font-semibold">{address.city}</span>
          </p>
          <p>
            pin : <span className="font-semibold">{address.pin}</span>
          </p>
          <p>
            State : <span className="font-semibold">{address.state}</span>
          </p>
          <p>
            Country : <span className="font-semibold">{address.country}</span>
          </p>
          <p className="mt-4">
            Mobile : <span className="font-semibold">{address.mobile}</span>
          </p>
        </div>
      </div>
      <button
        className="mt-6 rounded-lg bg-primary p-2 font-semibold text-white"
        onClick={() => router.push("/order-confirmation")}
      >
        Proceed to Buy
      </button>
    </div>
  );
};

const Address = () => {
  const { items, totalAmount } = { items: 1, totalAmount: 799 };
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const addresses = new Array(1).fill({
    name: "Kartik Chate",
    address: "Plot No.19,Ramnagar,Cidco,",
    city: "Aurangabad",
    pin: "431001",
    state: "Aurangabad",
    country: "Aurangabad",
    mobile: "+91-8275513320",
  });

  return (
    <Layout>
      <div className="space-y-4 xl:px-32 xl:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowBack />
            <p className="ms-4 text-2xl font-semibold">ADDRESS DETAILS</p>
          </div>
          <button
            className="bg-primary px-4 py-2 font-semibold text-white"
            onClick={() => router.push("/order-confirmation")}
          >
            Continue
          </button>
        </div>
        <div className="flex items-center justify-between bg-gray-300 p-3 font-semibold">
          <p>ITEMS: {items}</p>
          <p>TOTAL AMOUNT: Rs {totalAmount}</p>
        </div>
        <div>
          <p className="mb-3 font-semibold">Choose your delivery address :</p>
          <div className="flex flex-wrap items-center justify-center">
            {addresses.map((address, index) => (
              <div key={index} onClick={() => setSelectedAddress(index)}>
                <AddressDetails
                  address={address}
                  isSelected={index === selectedAddress}
                />
              </div>
            ))}
            <div className="mb-6 mr-6 flex h-72 w-96 flex-col items-center justify-center rounded-lg bg-gray-200 p-4 max-md:ml-6 md:w-96">
              <button
                className="text-6xl"
                onClick={() => setModalVisible(true)}
              >
                <AddBox fontSize="inherit" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-primary px-16 py-3 font-semibold text-white"
            onClick={() => router.push("/order-confirmation")}
          >
            Continue
          </button>
        </div>
        <NewAddress isVisible={isModalVisible} setVisibilty={setModalVisible} />
      </div>
    </Layout>
  );
};

export default Address;
