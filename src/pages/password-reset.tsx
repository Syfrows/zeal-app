import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import Layout from "@/components/layout";
import { useAuth } from "@/context/AuthContext";

const requestLink = gql`mutation RequestRecovery($email: String!) {
  requestPasswordReset(emailAddress: $email) { __typename }
}`;
const changePassword = gql`mutation ChangePassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) { __typename ... on PasswordValidationError { validationErrorMessage } }
}`;

export default function PasswordReset() {
  const router = useRouter();
  const token = typeof router.query.token === "string" ? router.query.token : "";
  const [request] = useMutation(requestLink);
  const [reset] = useMutation(changePassword);
  const { setIsLoggedIn } = useAuth();
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    setBusy(true); setMessage("");
    try {
      if (token) {
        const password = String(fields.get("password"));
        if (password !== fields.get("confirm")) { setMessage("The passwords must match."); return; }
        const result = (await reset({variables:{token,password}})).data?.resetPassword;
        if (result?.__typename === "CurrentUser") {
          setIsLoggedIn(true); setDone(true); setMessage("Your password has been updated.");
          await router.replace("/password-reset", undefined, {shallow:true});
        } else setMessage(result?.validationErrorMessage || "This link could not reset your password. Request a fresh link below.");
      } else {
        await request({variables:{email:String(fields.get("email")).trim()}});
        setMessage("If an account uses this email, look for a reset link in your inbox or spam folder.");
      }
    } catch { setMessage("The account service could not complete your request. Please try again."); }
    finally { setBusy(false); }
  }
  return <Layout><Head><title>Password recovery | Zeal Wear</title><meta name="referrer" content="no-referrer"/><meta name="robots" content="noindex"/></Head>
    <section className="recovery-panel"><h1 className="zeal-heading">{done ? "Password updated" : token ? "Choose a new password" : "Forgot password?"}</h1>
      {router.isReady && !done && <form className="account-fields" onSubmit={submit}>
        {token ? <><label>New password<input name="password" type="password" minLength={8} autoComplete="new-password" required/></label>
          <label>Confirm new password<input name="confirm" type="password" minLength={8} autoComplete="new-password" required/></label></>
          : <label>Account email<input name="email" type="email" autoComplete="email" required/></label>}
        <button className="zeal-button zeal-button-lime" disabled={busy}>{busy ? "Please wait…" : token ? "Save password" : "Send reset link"}</button></form>}
      {message && <p role="status" className="account-message">{message}</p>}
      {token && <Link className="account-help" href="/password-reset" onClick={() => setMessage("")}>Request a fresh reset link</Link>}
      <Link className="account-help" href="/">Return to the store</Link>
    </section></Layout>;
}
