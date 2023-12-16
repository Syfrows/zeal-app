import { PasswordValidationError, Success } from "@/__generated__/graphql";
import { SIGN_UP } from "@/graphql/accounts";
import { useMutation } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface Input {
  emailAddress: string;
  title: string;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  password: string;
}

const intialState: Input = {
  emailAddress: "",
  title: "",
  phoneNumber: "",
  password: "",
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const SignUp = ({ setSelectedTab }: any) => {
  const [inputs, setInputs] = useState(intialState);
  const [errors, setErrors] = useState(intialState);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP, {
    variables: {
      input: {
        emailAddress: inputs.emailAddress,
        title: "",
        phoneNumber: inputs.phoneNumber,
        password: inputs.password,
        firstName: inputs.title.split(" ")[0],
        lastName: inputs.title.split(" ")[1] || "",
      },
    },
  });

  useEffect(() => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        emailAddress:
          !emailRegex.test(inputs.emailAddress) &&
          inputs.emailAddress.length > 0
            ? "Enter valid email"
            : "",
      };
    });
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        title:
          inputs.title.length > 0 && inputs.title.length < 3
            ? "Name should contain at least 3 character"
            : "",
      };
    });
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        phoneNumber:
          inputs.phoneNumber.length !== 10 && inputs.phoneNumber.length > 0
            ? "Enter valid mobile number."
            : "",
      };
    });
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password:
          !passwordRegex.test(inputs.password) && inputs.password.length > 0
            ? "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and may include special characters."
            : "",
      };
    });
  }, [inputs]);

  useEffect(() => {
    (data?.registerCustomerAccount as Success)?.success &&
      setInputs(intialState);
    if (data?.registerCustomerAccount.__typename !== "Success") {
      const error = data?.registerCustomerAccount as PasswordValidationError;
      setSignUpError(error?.message);
    }
  }, [data?.registerCustomerAccount]);

  const onSignUp = () => {
    signUp();
  };

  const enabledSignUp =
    Object.values(errors).every((x) => !x) &&
    Object.values(inputs).every((x) => x);

  return (
    <div className="flex flex-col space-y-4 p-6">
      <TextField
        id="outlined-basic"
        label="Your name"
        variant="outlined"
        placeholder="Enter first and last name"
        value={inputs.title}
        error={!!errors.title}
        helperText={errors.title}
        onChange={(event) =>
          setInputs({ ...inputs, title: event.target.value })
        }
      />
      <TextField
        id="outlined-basic"
        label="Mobile Number"
        variant="outlined"
        type="tel"
        value={inputs.phoneNumber}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
        onChange={(event) => {
          const value = event.target.value;
          (/^\d+$/.test(value) || value.length === 0) &&
            setInputs({ ...inputs, phoneNumber: value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Email "
        variant="outlined"
        type="email"
        value={inputs.emailAddress}
        error={!!errors.emailAddress}
        helperText={errors.emailAddress}
        onChange={(event) =>
          setInputs({ ...inputs, emailAddress: event.target.value })
        }
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={inputs.password}
        error={!!errors.password}
        helperText={errors.password}
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
      <p className=" text-end text-slate-500"></p>
      <button
        className={`bg-primary py-3 text-lg font-semibold text-white ${
          (loading || !enabledSignUp) && "opacity-50"
        }`}
        onClick={onSignUp}
        disabled={loading || !enabledSignUp}
      >
        {loading ? <CircularProgress color="inherit" size={18} /> : "SIGN UP"}
      </button>
      {signUpError && (
        <p className=" text-center text-red-500 ">{signUpError}</p>
      )}
      {(data?.registerCustomerAccount as Success)?.success && (
        <p className=" text-center text-green-500 ">
          Registration successful. Please login to continue.
        </p>
      )}
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

export default SignUp;
