import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import loginImage from "../assets/login.png";

const LogInPanel = ({ setSelectedTab }: any) => {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <TextField
        id="outlined-basic"
        label="Enter your email/phone number"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
      />
      <p className=" text-end text-slate-500">Forgot Password?</p>
      <button className="bg-primary py-3 text-lg font-semibold text-white">
        LOGIN
      </button>
      <p className=" text-center text-slate-500 ">New to Relax Zeal?</p>
      <button
        className="bg-gray-300 py-3 text-lg font-semibold text-black"
        onClick={() => setSelectedTab(1)}
      >
        CREATE AN ACCOUNT
      </button>
    </div>
  );
};
const SignupPanel = ({ setSelectedTab }: any) => {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <TextField
        id="outlined-basic"
        label="Your name"
        variant="outlined"
        placeholder="Enter first and last name"
      />
      <TextField
        id="outlined-basic"
        label="Mobile Number"
        variant="outlined"
        type="tel"
      />
      <TextField
        id="outlined-basic"
        label="Email "
        variant="outlined"
        type="email"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
      />
      <p className=" text-end text-slate-500">Forgot Password?</p>
      <button className="bg-primary py-3 text-lg font-semibold text-white">
        SIGN UP
      </button>
      <p className=" text-center text-slate-500 ">Already have an account?</p>
      <button
        className="bg-gray-300 py-3 text-lg font-semibold text-black"
        onClick={() => setSelectedTab(0)}
      >
        LOGIN
      </button>
    </div>
  );
};

const LogInSignupModal = ({ isVisible, setVisibilty }: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Modal
      open={isVisible}
      onClose={() => setVisibilty(false)}
      className="overflow-auto"
    >
      <div className="mt-16 flex justify-center">
        <div className="border-2 border-slate-400 bg-white p-4">
          <button className="float-right" onClick={() => setVisibilty(false)}>
            <Close />
          </button>
          <div className="flex">
            <Image
              src={loginImage}
              alt={"relaxzeal"}
              width={480}
              height={640}
              className="hidden aspect-[480/640] object-scale-down lg:flex lg:w-1/2"
            />
            <div className="w-full lg:w-1/2">
              <Tabs
                className="mx-4"
                value={selectedTab}
                onChange={(_event, newValue) => setSelectedTab(newValue)}
              >
                <Tab label="LOGIN" />
                <Tab label="SIGN UP" />
              </Tabs>
              {selectedTab === 0 ? (
                <LogInPanel setSelectedTab={setSelectedTab} />
              ) : (
                <SignupPanel setSelectedTab={setSelectedTab} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogInSignupModal;
