import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import Checkout from ".";
import { useCartStore } from "stores";
import { act } from "react-dom/test-utils";
import { PRODUCTS } from "constant";

it("should display all cart items", () => {
  const { result } = renderHook(useCartStore);
  render(<Checkout />);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[1]);
  });

  screen.getByText(PRODUCTS[0].title, { exact: false });
  screen.getByText(PRODUCTS[1].title, { exact: false });
  expect(() => screen.getByText(PRODUCTS[2].title, { exact: false })).toThrow();
});

it("should show albr checkout button after select it", () => {
  render(<Checkout />);
  const span = screen.getByText("Ablr");
  expect(() =>
    screen.getByRole("button", { name: "Continue to Ablr" })
  ).toThrow();
  fireEvent.click(span);
  screen.getByRole("button", { name: "Continue to Ablr" });
});
