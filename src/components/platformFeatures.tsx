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
          className="m-4 flex w-80 flex-col items-center rounded-xl2 bg-white p-8 text-center shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover"
        >
          <div className="mb-5 rounded-full bg-primary-50 p-5 text-primary-600">
            {feature.icon}
          </div>
          <p className="mb-3 w-60 text-xl font-semibold text-primary-800">
            {feature.title}
          </p>
          <p className="text-slate-500">{feature.subTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default PlatformFeatures;
