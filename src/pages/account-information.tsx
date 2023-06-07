import Layout from "@/components/layout";
import SideNav from "@/components/sideNav";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const details = {
  firstName: "Kartik",
  lastName: "Chate",
  email: "kchate@gmail.com",
  mobile: "+91-8275579111",
};

const AccountInformation = () => {
  const [value, setValue] = useState("yes");

  return (
    <Layout>
      <div className="flex justify-center py-12 xl:px-32">
        <SideNav />
        <div className="flex flex-col">
          <p className="text-center text-2xl font-semibold">
            MY ACCOUNT INFORMATION
          </p>
          <p className="mt-5 font-bold text-gray-500">Your Personal Details</p>
          <div className="my-5 border-t-2 border-gray-300" />
          <div className="flex flex-col space-y-4">
            <div className="flex">
              <TextField
                label="First Name"
                variant="outlined"
                placeholder="First Name"
                className="me-5"
                value={details.firstName}
                required
              />
              <TextField
                label="Last Name"
                variant="outlined"
                placeholder="Last Name"
                value={details.lastName}
                required
              />
            </div>
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Email"
              value={details.email}
              required
            />
            <TextField
              label="Telephone"
              variant="outlined"
              placeholder="Telephone"
              value={details.mobile}
              required
            />
            <TextField
              label="Verify Password"
              variant="outlined"
              placeholder="Verify Password"
              required
            />
            <div className="flex items-center">
              <p className="me-4 font-bold">Subscribe to Newsletter</p>
              <RadioGroup
                row
                value={value}
                onChange={(event) => setValue(event.target.value)}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="default" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="default" />}
                  label="No"
                />
              </RadioGroup>
            </div>
          </div>
          <button className="mt-8 self-end bg-primary px-6 py-3 font-semibold text-white">
            Continue
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AccountInformation;
