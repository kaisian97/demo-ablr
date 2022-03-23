import { useStore } from "stores";

export const formatPrice = (price: string | number) => {
  const { currency, rate = 1 } = useStore.getState().store || {};
  console.log({ rate });
  let formattedPrice = typeof price !== "number" ? (price as any) * 1 : price;
  formattedPrice = formattedPrice * rate;

  return formattedPrice.toLocaleString(undefined, {
    style: "currency",
    currency,
    // currencyDisplay: "narrowSymbol",
  });
};
