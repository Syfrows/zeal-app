import { Close } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

const countries = [{ label: "India", countryCode: "+91 (IN)" }];
const states = [{ label: "Maharashtra" }];

const NewAddress = ({ isVisible, setVisibilty }: any) => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
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
            <div className="flex">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                placeholder="First Name"
                className="me-5"
                required
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                placeholder="Last Name"
                required
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Address 1"
              variant="outlined"
              placeholder="Address 1"
              required
            />
            <TextField
              id="outlined-basic"
              label="Address 2"
              variant="outlined"
              placeholder="Address 2"
              required
            />
            <div className="flex">
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                placeholder="City"
                className="me-5"
                required
              />
              <TextField
                id="outlined-basic"
                label="Post Code"
                variant="outlined"
                placeholder="Post Code"
                required
              />
            </div>
            <div className="flex">
              <Autocomplete
                options={countries}
                renderInput={(params) => (
                  <TextField {...params} label="Country Name" />
                )}
                onChange={(_event, value) => setSelectedCountry(value)}
                className="me-5 w-1/2"
              />
              <Autocomplete
                options={states}
                renderInput={(params) => (
                  <TextField {...params} label="Region / State" />
                )}
                className="w-1/2"
              />
            </div>
            <div className="flex">
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Country"
                className="me-5 w-24"
                value={selectedCountry?.countryCode}
                disabled
                required
              />
              <TextField
                id="outlined-basic"
                label="Telephone"
                variant="outlined"
                placeholder="Telephone"
                className="flex flex-grow"
                required
              />
            </div>
            <button className="my-4 max-w-[160px] self-center bg-primary px-6 py-4 font-semibold text-white">
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewAddress;
