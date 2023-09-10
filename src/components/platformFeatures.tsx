import React from "react";
import { ExchangeIcon, PercentageIcon, ServiceIcon } from "./icons";

const PlatformFeatures = () => {
  const features = [
    {
      icon: <ServiceIcon color="blue" width="22" height="22" />,
      title: "24/7 Services",
      subTitle:
        "Shops are necessary places,a where people go to buy is on their ",
    },
    {
      icon: <ExchangeIcon color="blue" width="22" height="22" />,
      title: "Exchange Opportunites",
      subTitle:
        "Shops are necessary places,a where people go to buy is on their ",
    },
    {
      icon: <PercentageIcon color="blue" width="22" height="22" />,
      title: "More Then Offer",
      subTitle:
        "Shops are necessary places,a where people go to buy is on their ",
    },
  ];
  return (
    <div className="mb-16 flex overflow-x-auto xl:justify-center">
      {features.map((feature, index) => (
        <div
          key={index}
          className="m-6 flex w-80 flex-col items-center rounded-lg p-8 text-center shadow-lg"
        >
          <div className="mb-5 rounded-lg bg-blue-100 p-4">{feature.icon}</div>
          <p className=" mb-3 w-60 text-xl font-semibold">{feature.title}</p>
          <p>{feature.subTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default PlatformFeatures;
