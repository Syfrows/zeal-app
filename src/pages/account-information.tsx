import { indianMobile, validName } from "@/helpers/customerFields";
import ServiceNotice from "@/components/serviceNotice";
import Layout from "@/components/layout";
import SideNav from "@/components/sideNav";
import { ACCOUNT_INFO, UPDATE_ACCOUNT_INFO } from "@/graphql/accounts";
import { useMutation, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

const AccountInformation = () => {
  const [message, setMessage] = useState("");
  const { data, error, loading: queryLoading } = useQuery(ACCOUNT_INFO);
  const details = data?.authenticatedUser;
  const [inputs, setInputs] = useState<any>(details);
  const [updateAccountInfo, { loading }] = useMutation(UPDATE_ACCOUNT_INFO);

  useEffect(() => setInputs(details), [details]);

  const onContinue = () => {
    if (loading) return;
    if (!validName(inputs?.firstName || "") || !validName(inputs?.lastName || "")) { setMessage("Enter a valid first and last name."); return; }
    if (!indianMobile(inputs?.phoneNumber || "")) { setMessage("Enter a valid Indian mobile number."); return; }
    setMessage("");
    updateAccountInfo({
      variables: {
        input: {

          firstName: inputs.firstName.trim(),
          lastName: inputs.lastName.trim(),
          phoneNumber: indianMobile(inputs.phoneNumber),
        },
      },
      onCompleted: (data) => { setInputs(data.updateCustomer); setMessage("Account details saved."); },
      onError: () => setMessage("Your changes could not be saved. Please try again."),
    });
  };

  if (error)
    return (
      <Layout>
        <ServiceNotice message="Your account details are temporarily unavailable." />
      </Layout>
    );
  if (queryLoading)
    return (
      <Layout>
        <p role="status">Loading…</p>
      </Layout>
    );
  if (!details)
    return (
      <Layout>
        <ServiceNotice message="Sign in to view your account." />
      </Layout>
    );
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
            <div className="flex space-x-3">
              <TextField
                label="First Name"
                variant="outlined"
                placeholder="First Name"
                className="me-5"
                value={inputs?.firstName}
                onChange={(event) =>
                  setInputs({ ...inputs, firstName: event.target.value })
                }
                required
              />
              <TextField
                label="Last Name"
                variant="outlined"
                placeholder="Last Name"
                value={inputs?.lastName}
                onChange={(event) =>
                  setInputs({ ...inputs, lastName: event.target.value })
                }
                required
              />
            </div>
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Email"
              value={inputs?.emailAddress}
              disabled
            />
            <TextField
              label="Telephone"
              variant="outlined"
              placeholder="Telephone"
              value={inputs?.phoneNumber}
              onChange={(event) =>
                setInputs({ ...inputs, phoneNumber: event.target.value })
              }
              required
            />
            {message && <p role="status">{message}</p>}
          </div>
          <button
            className={`mt-8 self-end bg-primary px-6 py-3 font-semibold text-white ${
              loading && "opacity-50"
            }`}
            disabled={loading}
            onClick={onContinue}
          >
            {loading && (
              <CircularProgress color="inherit" size={16} className="mr-2" />
            )}
            Continue
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AccountInformation;
