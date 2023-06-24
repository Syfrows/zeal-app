import { CurrentUser, InvalidCredentialsError } from "@/__generated__/graphql";
import { LOG_IN } from "@/graphql/accounts";
import { useMutation } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface Data {
  email: string;
  password: string;
}

const intialState: Data = {
  email: "",
  password: "",
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LogIn = ({ setSelectedTab, setVisibilty, setIsLoggedIn }: any) => {
  const [inputs, setInputs] = useState(intialState);
  const [errors, setErrors] = useState(intialState);
  const [loginError, setLoginError] = useState("");

  const [logIn, { data, loading, error }] = useMutation(LOG_IN, {
    variables: {
      username: inputs.email,
      password: inputs.password,
    },
  });

  useEffect(() => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        email:
          !emailRegex.test(inputs.email) && inputs.email.length > 0
            ? "Enter valid email"
            : "",
      };
    });
  }, [inputs]);

  useEffect(() => {
    if ((data?.login as CurrentUser)?.id) {
      setIsLoggedIn(true);
      setVisibilty(false);
    }
    if (data?.login.__typename !== "CurrentUser") {
      const error = data?.login as InvalidCredentialsError;
      setLoginError(error?.message);
    }
  }, [data?.login, setIsLoggedIn, setVisibilty]);

  const onLogIn = () => {
    logIn();
  };

  const enabledLogin =
    Object.values(errors).every((x) => !x) &&
    Object.values(inputs).every((x) => x);

  return (
    <div className="flex flex-col space-y-4 p-6">
      <TextField
        id="outlined-basic"
        label="Enter your email"
        variant="outlined"
        value={inputs.email}
        error={!!errors.email}
        helperText={errors.email}
        onChange={(event) =>
          setInputs({ ...inputs, email: event.target.value })
        }
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        value={inputs.password}
        onChange={(event) =>
          setInputs({ ...inputs, password: event.target.value })
        }
      />
      <p className=" text-end text-slate-500">Forgot Password?</p>
      <button
        className={`bg-primary py-3 text-lg font-semibold text-white ${
          (loading || !enabledLogin) && "opacity-50"
        }`}
        onClick={onLogIn}
        disabled={loading || !enabledLogin}
      >
        {loading ? <CircularProgress color="inherit" size={18} /> : "LOGIN"}
      </button>
      {loginError && <p className=" text-center text-red-500 ">{loginError}</p>}
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

export default LogIn;
