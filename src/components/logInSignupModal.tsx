import { validName, indianMobile, validEmail } from "@/helpers/customerFields";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Modal from "@mui/material/Modal";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE, LOG_IN, SIGN_UP } from "@/graphql/accounts";
import { useAuth } from "@/context/AuthContext";

interface Props {
  isVisible: boolean;
  setVisibilty: (visible: boolean) => void;
}

function AccountForm({ close }: { close: () => void }) {
  const client = useApolloClient();
  const { setIsLoggedIn } = useAuth();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [login] = useMutation(LOG_IN);
  const [signup] = useMutation(SIGN_UP);
  const [google] = useMutation(AUTHENTICATE);

  function switchForm(next: boolean) {
    setRegister(next);
    setMessage("");
    setPassword("");
    setVisible(false);
  }

  function complete() {
    setIsLoggedIn(true);
    void client.refetchQueries({ include: "active" }).catch(() => undefined);
    close();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      if (register && !validEmail(email)) { setMessage("Enter a complete email address, such as name@example.com."); return; }
      if (register) {
        if (!validName(firstName) || !validName(lastName)) {
          setMessage("Enter a first and last name using letters, spaces, apostrophes, periods or hyphens.");
          return;
        }
        if (!indianMobile(phone)) { setMessage("Enter a valid Indian mobile number, optionally starting with +91."); return; }
        const result = await signup({
          variables: {
            input: {
              emailAddress: email.trim(),
              password,
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              phoneNumber: indianMobile(phone),
              title: "",
            },
          },
        });
        const account = result.data?.registerCustomerAccount;
        if (account?.__typename !== "Success" || !account.success) {
          setMessage(
            account && "message" in account
              ? account.message
              : "Registration could not be completed."
          );
          return;
        }
        switchForm(false);
        setMessage(
          "Registration received. Sign in with your email and password."
        );
        return;
      }
      const result = await login({
        variables: { username: email.trim(), password },
      });
      const user = result.data?.login;
      if (user?.__typename === "CurrentUser") complete();
      else
        setMessage(
          user && "message" in user
            ? user.message
            : "Check your email and password and try again."
        );
    } catch {
      setMessage("We could not reach the account service. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className="account-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-title"
    >
      <div className="account-photo" aria-hidden="true" />
      <div className="account-body">
        <button
          className="account-close"
          aria-label="Close account dialog"
          onClick={close}
        >
          <Close />
        </button>
        <h2 id="account-title" className="zeal-heading">
          {register ? "Create an account" : "Welcome back"}
        </h2>
        <form onSubmit={submit} className="account-fields">
          {register && (
            <>
              <label>
                First name
                <input
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>Last name<input required autoComplete="family-name" value={lastName} onChange={e => setLastName(e.target.value)} /></label>
              <label>
                Mobile number
                <input
                  type="tel"
                  required
                  autoComplete="tel-national"
                  inputMode="tel"
                  placeholder="+91 or 10-digit mobile number"
                  title="Enter a 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </>
          )}
          <label>
            Email address
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="account-password">Password</label>
          <div className="account-password">
            <input
              id="account-password"
              required
              type={visible ? "text" : "password"}
              autoComplete={register ? "new-password" : "current-password"}
              minLength={register ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label={visible ? "Hide password" : "Show password"}
              onClick={() => setVisible(!visible)}
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          {message && (
            <p role="status" className="account-message">
              {message}
            </p>
          )}
          <button
            type="submit"
            className="zeal-button zeal-button-lime"
            disabled={busy}
          >
            {busy ? "Please wait…" : register ? "Create account" : "Sign in"}
          </button>
        </form>
        <button
          className="account-switch"
          disabled={busy}
          type="button"
          onClick={() => switchForm(!register)}
        >
          {register
            ? "Already registered? Sign in"
            : "New to Zeal Wear? Create an account"}
        </button>
        <Link className="account-help" href="/password-reset" onClick={close}>Forgot password?</Link>
        {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
          <GoogleLogin
            onError={() => setMessage("Google sign-in could not be completed.")}
            onSuccess={async ({ credential }) => {
              if (!credential || busy) return;
              setBusy(true);
              try {
                const result = await google({
                  variables: { token: credential },
                });
                if (result.data?.authenticate.__typename === "CurrentUser")
                  complete();
                else setMessage("Google sign-in could not be completed.");
              } catch {
                setMessage(
                  "The account service could not complete Google sign-in."
                );
              } finally {
                setBusy(false);
              }
            }}
          />
        )}
      </div>
    </section>
  );
}

export default function LogInSignupModal({ isVisible, setVisibilty }: Props) {
  return (
    <Modal
      open={isVisible}
      onClose={() => setVisibilty(false)}
      className="account-overlay"
    >
      <div tabIndex={-1}>
        <AccountForm close={() => setVisibilty(false)} />
      </div>
    </Modal>
  );
}
