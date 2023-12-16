import { CurrentUser, InvalidCredentialsError } from "@/__generated__/graphql";
import { useAuth } from "@/context/AuthContext";
import { AUTHENTICATE, LOG_IN } from "@/graphql/accounts";
import { useMutation } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { GoogleLogin } from "@react-oauth/google";
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

const LogIn = ({ setSelectedTab, setVisibilty }: any) => {
  const [inputs, setInputs] = useState(intialState);
  const [errors, setErrors] = useState(intialState);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useAuth();

  const [logIn, { data, loading, error }] = useMutation(LOG_IN, {
    variables: {
      username: inputs.email,
      password: inputs.password,
    },
  });

  const [googleLogIn, googleLogInData] = useMutation(AUTHENTICATE);

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
    const logInData = data?.login || googleLogInData?.data?.authenticate;
    if ((logInData as CurrentUser)?.id) {
      setIsLoggedIn(true);
      setVisibilty(false);
    }
    if (logInData?.__typename !== "CurrentUser") {
      const error = logInData as InvalidCredentialsError;
      setLoginError(error?.message);
    }
  }, [data, setIsLoggedIn, setVisibilty, googleLogInData]);

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
        type={showPassword ? "text" : "password"}
        value={inputs.password}
        onChange={(event) =>
          setInputs({ ...inputs, password: event.target.value })
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
      <div className=" self-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            googleLogIn({
              variables: { token: credentialResponse?.credential || "" },
            });
          }}
        />
      </div>
    </div>
  );
};

export default LogIn;
