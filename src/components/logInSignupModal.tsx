import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Image from "next/image";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import loginImage from "../assets/login.png";
import LogIn from "./logIn";
import SignUp from "./signUp";

const LogInSignupModal = ({ isVisible, setVisibilty, setIsLoggedIn }: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Modal
      open={isVisible}
      onClose={() => setVisibilty(false)}
      className="overflow-auto"
    >
      <div className="mt-16 flex justify-center">
        <div className="w-11/12 border-2 border-slate-400 bg-white p-4 sm:w-3/5">
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
                <LogIn
                  setSelectedTab={setSelectedTab}
                  setVisibilty={setVisibilty}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ) : (
                <SignUp setSelectedTab={setSelectedTab} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogInSignupModal;
