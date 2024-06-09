import axios from "axios";
const productsUrl =
  "https://online-json-server-api.up.railway.app/project/6660967f1d2cd3eb1142be54";

export const customFetch = axios.create({
  baseURL: productsUrl,
});

// format price

export const formatPrice = (price) => {
  let dollarAmout = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(Math.trunc(price));

  return dollarAmout;
};
