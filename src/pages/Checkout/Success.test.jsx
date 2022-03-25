import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useCartStore } from "stores";
import { act } from "react-dom/test-utils";
import { PRODUCTS } from "constant";
import CheckoutSuccess from "./Success";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const renderComponent = (qs) =>
  render(
    <MemoryRouter initialEntries={[`/checkout/success/?${qs}`]}>
      <Routes>
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
      </Routes>
    </MemoryRouter>
  );

test("payment successful and clear cart", () => {
  const { result } = renderHook(useCartStore);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[1]);
  });

  renderComponent("checkout_id=251&order_state=2&order_code=123");

  expect(result.current.cart.length).toEqual(0);
});
