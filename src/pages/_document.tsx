import { Html, Head, Main, NextScript } from "next/document";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <GoogleTagManager gtmId="GTM-PFPCZSL5" />
      <GoogleAnalytics gaId="G-SQTLLY9XNG" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
