import { Close } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  AVAILABLE_COUNTRIES,
  CREATE_CUSTOMER_ADDRESS,
} from "@/graphql/address";
import CircularProgress from "@mui/material/CircularProgress";

interface Address {
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  postCode: string;
  city: string;
  state: string;
  countryCode: string;
  phoneNumber: string;
}

const intialState: Address = {
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  postCode: "",
  city: "",
  state: "",
  countryCode: "",
  phoneNumber: "",
};

const NewAddress = ({ isVisible, setVisibilty, refetch }: any) => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const { data } = useQuery(AVAILABLE_COUNTRIES);
  const countries = data?.availableCountries.map((x) => {
    if (!x.enabled) return;
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
  const [address, setAddress] = useState(intialState);
  const [createAddress, createAddressData] = useMutation(
    CREATE_CUSTOMER_ADDRESS
  );
  useEffect(() => {
    if (createAddressData?.data) {
      setVisibilty(false);
      refetch();
    }
  }, [createAddressData, setVisibilty, refetch]);
  const onContinue = () => {
    createAddress({
      variables: {
        input: {
          fullName: address.firstName + " " + address.lastName,
          streetLine1: address.line1,
          streetLine2: address.line2,
          postalCode: address.postCode,
          city: address.city,
          province: address.state,
          countryCode: address.countryCode,
          phoneNumber: selectedCountry?.phoneCode + "-" + address.phoneNumber,
        },
      },
    });
  };
  const disabledContinue =
    !Object.values(address).every((x) => x) || createAddressData.loading;
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
              NEW ADDRESS
            </p>
            <button className="text-white" onClick={() => setVisibilty(false)}>
              <Close />
            </button>
          </div>
          <div className="flex flex-col space-y-4 px-8 py-4">
            <div className="flex space-x-4">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                placeholder="First Name"
                required
                onChange={(event) =>
                  setAddress({ ...address, firstName: event.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                placeholder="Last Name"
                required
                onChange={(event) =>
                  setAddress({ ...address, lastName: event.target.value })
                }
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Address 1"
              variant="outlined"
              placeholder="Address 1"
              required
              onChange={(event) =>
                setAddress({ ...address, line1: event.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Address 2"
              variant="outlined"
              placeholder="Address 2"
              required
              onChange={(event) =>
                setAddress({ ...address, line2: event.target.value })
              }
            />
            <div className="flex space-x-4">
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                placeholder="City"
                required
                onChange={(event) =>
                  setAddress({ ...address, city: event.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Post Code"
                variant="outlined"
                placeholder="Post Code"
                inputProps={{ maxLength: 5 }}
                required
                onChange={(event) =>
                  setAddress({
                    ...address,
                    postCode: event.target.value.replace(/[^0-9]/g, ""),
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
                className="w-1/2"
              />
              <TextField
                id="outlined-basic"
                label="State"
                variant="outlined"
                placeholder="State"
                required
                onChange={(event) =>
                  setAddress({ ...address, state: event.target.value })
                }
              />
            </div>
            <div className="flex space-x-4">
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Country"
                className="w-24"
                value={countryCode}
                disabled
                required
              />
              <TextField
                id="outlined-basic"
                label="Telephone"
                variant="outlined"
                placeholder="Telephone"
                className="flex flex-grow"
                type="tel"
                value={address.phoneNumber}
                inputProps={{ maxLength: 10 }}
                required
                onChange={(event) =>
                  setAddress({
                    ...address,
                    phoneNumber: event.target.value.replace(/[^0-9]/g, ""),
                  })
                }
              />
            </div>
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

export default NewAddress;
