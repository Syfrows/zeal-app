import { shimmerDataUrl } from "@/helpers/helper";
import Image from "next/image";
import React from "react";

const Shimmer = ({ width, height }: { width?: number; height?: number }) => {
  const props =
    width && height ? { width: width, height: height } : { fill: true };
  return <Image src={shimmerDataUrl} alt="loading..." {...props} />;
};

export default Shimmer;
