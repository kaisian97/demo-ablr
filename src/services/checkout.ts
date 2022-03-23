import { useStore } from "stores";

export const checkout = async (payload: {
  amount: string;
  redirect_url: string;
}) => {
  const { store } = useStore.getState();

  const formattedPayload = {
    ...payload,
    store_id: store.value,
  };

  const res = await fetch(
    "https://api.uat.ablr.com/api/v2/public/merchant/checkout/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.secret}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedPayload),
    }
  );
  const resData = await res.json();
  window.location.href = resData.data.checkout_url;

  return resData.data;
};
