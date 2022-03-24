import { checkout } from "./checkout";

it("should able to get checkout_url", () => {
  return checkout({
    amount: "100.00",
  }).then((data) => {
    expect(data.checkout_url).toBeTruthy();
  });
});
