import { validName, indianMobile } from "@/helpers/customerFields";
import { Close } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  AVAILABLE_COUNTRIES,
  CREATE_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
} from "@/graphql/address";
import CircularProgress from "@mui/material/CircularProgress";

interface Address {
  firstName: string;
  lastName: string;
  line1: string;
  postCode: string;
  city: string;
  state: string;
  countryCode: string;
  phoneNumber: string;
}

const AddEditAddress = ({
  isVisible,
  setVisibilty,
  refetch,
  editAddress,
}: any) => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const { data } = useQuery(AVAILABLE_COUNTRIES);
  const countries = data?.availableCountries.filter(x => x.enabled).map((x) => {

    return {
      id: x.id,
      label: x.name,
      code: x.code,
      phoneCode: x.code === "IN" ? "+91" : "",
    };
  });
  const countryCode = selectedCountry
    ? `${selectedCountry?.phoneCode} ${selectedCountry?.code}`
    : "";
  const intialState: Address = {
    firstName: editAddress?.fullName?.split(" ")[0] ?? "",
    lastName: editAddress?.fullName?.trim().split(/\s+/).slice(1).join(" ") ?? "",
    line1: editAddress?.streetLine1 ?? "",
    postCode: editAddress?.postalCode ?? "",
    city: editAddress?.city ?? "",
    state: editAddress?.province ?? "",
    countryCode: editAddress?.phoneNumber?.split("-")[0] ?? "",
    phoneNumber: (editAddress?.phoneNumber || "").replace(/^\+91-/, "").replace(/^-/,""),
  };
  const [address, setAddress] = useState(intialState);
  const [createAddress, createAddressData] = useMutation(
    CREATE_CUSTOMER_ADDRESS
  );
  const [updateAddress, updateAddressData] = useMutation(
    UPDATE_CUSTOMER_ADDRESS
  );

  useEffect(() => {
    const value = countries?.find((X) => X?.code === (editAddress?.country?.code || "IN"));
    setSelectedCountry(value);
    setAddress((prev) => {
      return { ...prev, countryCode: value?.code || "" };
    });
  }, [data, editAddress]);

  useEffect(() => {
    if (createAddressData?.data || updateAddressData?.data) {
      setVisibilty(false);
      refetch();
    }
  }, [createAddressData, updateAddressData, setVisibilty, refetch]);

  const [message, setMessage] = useState("");
  const onContinue = async () => {
    if (!validName(address.firstName) || !validName(address.lastName)) { setMessage("Enter a valid first and last name."); return; }
    if (address.countryCode === "IN" && (!/^[1-9]\d{5}$/.test(address.postCode) || !indianMobile(address.phoneNumber))) { setMessage("Enter a six-digit PIN code and a valid Indian mobile number."); return; }
    setMessage("");
    const input = {
      fullName: address.firstName + " " + address.lastName,
      streetLine1: address.line1,
      postalCode: address.postCode,
      city: address.city,
      province: address.state,
      countryCode: address.countryCode,
      phoneNumber: (selectedCountry?.phoneCode ? selectedCountry.phoneCode + "-" : "") + address.phoneNumber,
    };
    try { if (editAddress) {
      await updateAddress({ variables: { input: { id: editAddress.id, ...input } } });
    } else {
      await createAddress({
        variables: {
          input: input,
        },
      });
    }
    } catch { setMessage("Address could not be saved. Please try again."); }
  };
  const disabledContinue =
    !Object.values(address).every((x) => x.trim()) || createAddressData.loading || updateAddressData.loading;
  return (
    <Modal
      open={isVisible}
      onClose={() => setVisibilty(false)}
      className="overflow-auto"
    >
      <div className="mt-16 flex justify-center">
        <div className="bg-white">
          <div className="flex items-center justify-between bg-primary px-8 py-4">
            <p className="mx-4 text-2xl font-semibold text-white">
              {editAddress ? "EDIT" : "NEW"} ADDRESS
            </p>
            <button className="text-white" onClick={() => setVisibilty(false)}>
              <Close />
            </button>
          </div>
          <div className="flex flex-col space-y-4 px-8 py-4">
            <div className="flex space-x-4">
              <TextField
                
                label="First Name"
                variant="outlined"
                placeholder="First Name"
                required
                value={address.firstName}
                onChange={(event) =>
                  setAddress({ ...address, firstName: event.target.value })
                }
              />
              <TextField
                
                label="Last Name"
                variant="outlined"
                placeholder="Last Name"
                required
                value={address.lastName}
                onChange={(event) =>
                  setAddress({ ...address, lastName: event.target.value })
                }
              />
            </div>
            <TextField
              
              label="Address"
              variant="outlined"
              placeholder="Address"
              required
              value={address.line1}
              onChange={(event) =>
                setAddress({ ...address, line1: event.target.value })
              }
            />
            <div className="flex space-x-4">
              <TextField
                
                label="City"
                variant="outlined"
                placeholder="City"
                required
                value={address.city}
                onChange={(event) =>
                  setAddress({ ...address, city: event.target.value })
                }
              />
              <TextField
                
                label="Post Code"
                variant="outlined"
                placeholder="Post Code"
                inputProps={{ maxLength: address.countryCode === "IN" ? 6 : 16 }}
                required
                value={address.postCode}
                onChange={(event) =>
                  setAddress({
                    ...address,
                    postCode: address.countryCode === "IN" ? event.target.value.replace(/[^0-9]/g, "") : event.target.value,
                  })
                }
              />
            </div>
            <div className="flex space-x-4">
              <Autocomplete
                options={countries || []}
                renderInput={(params) => (
                  <TextField {...params} label="Country" />
                )}
                onChange={(_event, value) => {
                  setSelectedCountry(value);
                  setAddress({ ...address, countryCode: value?.code || "" });
                }}
                value={selectedCountry}
                isOptionEqualToValue={(option, value) => option.code === value?.code}
                className="w-1/2"
              />
              <TextField
                
                label="State"
                variant="outlined"
                placeholder="State"
                required
                value={address.state}
                onChange={(event) =>
                  setAddress({ ...address, state: event.target.value })
                }
              />
            </div>
            <div className="flex space-x-4">
              <TextField
                
                variant="outlined"
                placeholder="Country"
                className="w-24"
                value={countryCode}
                disabled
                required
              />
              <TextField
                
                label="Telephone"
                variant="outlined"
                placeholder="Telephone"
                className="flex flex-grow"
                type="tel"
                value={address.phoneNumber}
                inputProps={{ maxLength: address.countryCode === "IN" ? 10 : 15 }}
                required
                onChange={(event) =>
                  setAddress({
                    ...address,
                    phoneNumber: event.target.value.replace(/[^0-9]/g, ""),
                  })
                }
              />
            </div>
            {message && <p role="alert">{message}</p>}
            <button
              className={`my-4 max-w-[160px] self-center bg-primary px-6 py-4 font-semibold text-white ${
                disabledContinue && "opacity-50"
              }`}
              onClick={onContinue}
              disabled={disabledContinue}
            >
              {createAddressData.loading && (
                <CircularProgress color="inherit" size={16} className="mr-2" />
              )}
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditAddress;
