import {
  Address,
  GetShippingMethodsQuery,
  SetShippingAddressMutation,
} from "@/__generated__/graphql";
import Layout from "@/components/layout";
import NewAddress from "@/components/newAddress";
import { GET_ADDRESS } from "@/graphql/address";
import {
  GET_SHIPPING_METHODS,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
} from "@/graphql/orderWorkflow";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  AddBox,
  ArrowBack,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

interface AddressDetailsProps {
  address: Address;
  isSelected: boolean;
  onContinue: () => void;
}

const AddressDetails = ({
  address,
  isSelected,
  onContinue,
}: AddressDetailsProps) => {
  const isOrderWorkFlow = !!useSearchParams().get("order");
  return (
    <div className="mb-6 mr-6 flex flex-col rounded-lg bg-gray-200 p-6 max-md:ml-6 md:w-96">
      <div className="flex space-x-3">
        {isOrderWorkFlow &&
          (isSelected ? <RadioButtonChecked /> : <RadioButtonUnchecked />)}
        <div>
          <p className="mb-3 font-semibold">{address.fullName}</p>
          <p className="line-clamp-1">
            Address :{" "}
            <span className="font-semibold">
              {address.streetLine1 + " " + address.streetLine2}
            </span>
          </p>
          <p>
            City : <span className="font-semibold">{address.city}</span>
          </p>
          <p>
            pin : <span className="font-semibold">{address.postalCode}</span>
          </p>
          <p>
            State : <span className="font-semibold">{address.province}</span>
          </p>
          <p>
            Country :{" "}
            <span className="font-semibold">{address.country.name}</span>
          </p>
          <p className="mt-4">
            Mobile :{" "}
            <span className="font-semibold">{address.phoneNumber}</span>
          </p>
        </div>
      </div>
      {false && (
        <button
          className="mt-6 rounded-lg bg-primary p-2 font-semibold text-white"
          onClick={onContinue}
        >
          Proceed to Buy
        </button>
      )}
    </div>
  );
};

const Address = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const isOrderWorkFlow = !!useSearchParams().get("order");
  const router = useRouter();
  const { loading, data, error, refetch } = useQuery(GET_ADDRESS);
  const addresses = data?.activeCustomer?.addresses;
  const [selectedAddress, setSelectedAddress] = useState(
    addresses && addresses[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [setShippingAddress] = useMutation(SET_SHIPPING_ADDRESS);
  const [getShippingMethods] = useLazyQuery(GET_SHIPPING_METHODS);
  const [setShippingMethods] = useMutation(SET_SHIPPING_METHOD);
  const disabledContinue = !selectedAddress || isLoading;
  const onSetShippingAddress = (_data: SetShippingAddressMutation) => {
    getShippingMethods({
      onCompleted: onGetShippingMethods,
    });
  };

  const onGetShippingMethods = (data: GetShippingMethodsQuery) => {
    setShippingMethods({
      variables: { shippingMethodId: data.eligibleShippingMethods[0].id },
      onCompleted: () => router.push("/order-confirmation"),
    });
  };

  const onContinue = () => {
    if (!selectedAddress) return;
    setIsLoading(true);
    setShippingAddress({
      variables: {
        input: {
          fullName: selectedAddress.fullName,
          streetLine1: selectedAddress.streetLine1,
          streetLine2: selectedAddress.streetLine2,
          postalCode: selectedAddress.postalCode,
          city: selectedAddress.city,
          province: selectedAddress.province,
          countryCode: selectedAddress.country.code,
          phoneNumber: selectedAddress.phoneNumber,
        },
      },
      onCompleted: onSetShippingAddress,
    });
  };

  const ContinueButton = () => {
    return isOrderWorkFlow ? (
      <div className="flex justify-center">
        <button
          className={`w-48 bg-primary py-3 font-semibold text-white ${
            disabledContinue && "opacity-50"
          }`}
          onClick={onContinue}
          disabled={disabledContinue}
        >
          {isLoading && (
            <CircularProgress color="inherit" size={16} className="mr-2" />
          )}
          Continue
        </button>
      </div>
    ) : (
      <></>
    );
  };

  return (
    <Layout>
      <div className="space-y-4 xl:px-32 xl:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowBack />
            <p className="ms-4 text-2xl font-semibold">ADDRESS DETAILS</p>
          </div>
          <ContinueButton />
        </div>
        <div>
          {isOrderWorkFlow && (
            <p className="mb-3 font-semibold">Choose your delivery address :</p>
          )}
          <div className="flex flex-wrap items-center justify-center">
            {addresses?.map((address, index) => (
              <div key={index} onClick={() => setSelectedAddress(address)}>
                <AddressDetails
                  address={address as Address}
                  isSelected={address.id === selectedAddress?.id}
                  onContinue={onContinue}
                />
              </div>
            ))}
            <div className="mb-6 mr-6 flex h-60 w-96 flex-col items-center justify-center rounded-lg bg-gray-200 p-4 max-md:ml-6 md:w-96">
              <button
                className="text-6xl"
                onClick={() => setModalVisible(true)}
              >
                <AddBox fontSize="inherit" />
              </button>
            </div>
          </div>
        </div>
        <ContinueButton />
        {isModalVisible && (
          <NewAddress
            isVisible={isModalVisible}
            setVisibilty={setModalVisible}
            refetch={refetch}
          />
        )}
      </div>
    </Layout>
  );
};

export default Address;
