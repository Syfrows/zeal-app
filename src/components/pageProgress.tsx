import { useEffect, useState } from "react";
import Router from "next/router";

export default function PageProgress() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let current = "";
    const start = (url: string, { shallow }: { shallow: boolean }) => { current = url; setLoading(!shallow); };
    const finish = (url: string) => { if (url === current) setLoading(false); };
    const fail = (_: unknown, url: string) => finish(url);
    setLoading(false);
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", finish);
    Router.events.on("routeChangeError", fail);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", finish);
      Router.events.off("routeChangeError", fail);
    };
  }, []);
  return loading ? <div role="status" className="page-progress"><span className="sr-only">Loading page</span></div> : null;
}
