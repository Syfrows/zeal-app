import ServiceNotice from "@/components/serviceNotice";
import {
  Address,
  GetShippingMethodsQuery,
  SetShippingAddressMutation,
} from "@/__generated__/graphql";
import Layout from "@/components/layout";
import AddEditAddress from "@/components/addEditAddress";
import { DELETE_CUSTOMER_ADDRESS, GET_ADDRESS } from "@/graphql/address";
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
  Edit,
  Delete,
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AddressDetailsProps {
  address: Address;
  isSelected: boolean;
  onContinue: () => void;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
}

const AddressDetails = ({
  address,
  isSelected,
  onContinue,
  onEdit,
  onDelete,
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
              {[address.streetLine1, address.streetLine2].filter(Boolean).join(" ")}
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
      <div className="space-x-4 self-end">
        <button aria-label="Edit address" onClick={() => onEdit(address)}>
          <Edit />
        </button>
        <button aria-label="Delete address" onClick={() => onDelete(address.id)}>
          <Delete />
        </button>
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
  const addresses = data?.authenticatedUser?.addresses;
  const [selectedAddress, setSelectedAddress] = useState(
    addresses && addresses[0]
  );
  const [shippingError, setShippingError] = useState("");
  const shippingFailed = () => {
    setIsLoading(false);
    setShippingError(
      "Shipping could not be confirmed. Check the address and try again."
    );
  };
  const [isLoading, setIsLoading] = useState(false);
  const [setShippingAddress] = useMutation(SET_SHIPPING_ADDRESS);
  const [getShippingMethods] = useLazyQuery(GET_SHIPPING_METHODS);
  const [setShippingMethods] = useMutation(SET_SHIPPING_METHOD);
  const disabledContinue = !selectedAddress || isLoading;
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [deleteAddress] = useMutation(DELETE_CUSTOMER_ADDRESS);

  useEffect(() => {
    setSelectedAddress(addresses && addresses[0]);
  }, [addresses]);

  const onSetShippingAddress = (result: SetShippingAddressMutation) => {
    if (result.setOrderShippingAddress.__typename !== "Order") { shippingFailed(); return; }
    getShippingMethods({
      onError: shippingFailed,
      onCompleted: onGetShippingMethods,
    });
  };

  const onGetShippingMethods = (data: GetShippingMethodsQuery) => {
    if (!data.eligibleShippingMethods.length) {
      shippingFailed();
      return;
    }
    setShippingMethods({
      variables: { shippingMethodId: data.eligibleShippingMethods[0].id },
      onError: shippingFailed,
      onCompleted: (result) =>
        result.setOrderShippingMethod.__typename === "Order"
          ? router.push("/order-confirmation")
          : shippingFailed(),
    });
  };

  const onContinue = () => {
    if (!selectedAddress) return;
    setShippingError("");
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
      onError: shippingFailed,
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

  if (error)
    return (
      <Layout>
        <ServiceNotice message="Your addresses are temporarily unavailable." />
      </Layout>
    );
  if (loading || !data?.authenticatedUser) return <Layout><ServiceNotice message={loading ? "Loading your addresses…" : "Sign in to manage delivery addresses."} /></Layout>;
  return (
    <Layout>
      {shippingError && <p role="alert">{shippingError}</p>}
      <div className="space-y-4 xl:px-32 xl:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowBack onClick={() => router.back()} />
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
                  onEdit={(address) => {
                    setEditAddress(address);
                    setModalVisible(true);
                  }}
                  onDelete={(id) =>
                    deleteAddress({
                      variables: { id: id },
                      onCompleted: () => refetch(),
                    })
                  }
                />
              </div>
            ))}
            <div className="mb-6 mr-6 flex h-[268px] w-96 flex-col items-center justify-center rounded-lg bg-gray-200 p-4 max-md:ml-6 md:w-96">
              <button
                aria-label="Add address" className="text-6xl"
                onClick={() => {
                  setEditAddress(null);
                  setModalVisible(true);
                }}
              >
                <AddBox fontSize="inherit" />
              </button>
            </div>
          </div>
        </div>
        <ContinueButton />
        {isModalVisible && (
          <AddEditAddress
            isVisible={isModalVisible}
            setVisibilty={setModalVisible}
            refetch={refetch}
            editAddress={editAddress}
          />
        )}
      </div>
    </Layout>
  );
};

export default Address;
