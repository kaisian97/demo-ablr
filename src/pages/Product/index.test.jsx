import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useStore } from "stores";
import ProductPage from ".";
import { PRODUCTS, STORES } from "constant";
import { textContentMatcher } from "setupTests";
import { formatPrice } from "utils";

const renderComponent = ({ productId }) =>
  render(
    <MemoryRouter initialEntries={[`/product/${productId}`]}>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>
  );

test("show product details correctly", () => {
  renderComponent({ productId: PRODUCTS[0].id });

  screen.getByText(PRODUCTS[0].title);
  screen.getByText(PRODUCTS[0].description);
});

test("show product price in SGD correctly", async () => {
  renderComponent({ productId: PRODUCTS[0].id });

  const { result } = renderHook(useStore);

  act(() => {
    result.current.setStore(STORES[1]);
  });

  await screen.findByText(textContentMatcher(formatPrice(PRODUCTS[0].price)));
});

test("show product price in MYR correctly", async () => {
  renderComponent({ productId: PRODUCTS[0].id });

  const { result } = renderHook(useStore);

  act(() => {
    result.current.setStore(STORES[0]);
  });

  await screen.findByText(textContentMatcher(formatPrice(PRODUCTS[0].price)));
});

test("show added item quantity beside add to cart button", async () => {
  renderComponent({ productId: PRODUCTS[0].id });

  const addToCartBtn = screen.getByText("Add to cart", { exact: false });
  fireEvent.click(addToCartBtn);
  fireEvent.click(addToCartBtn);

  screen.getByText(`Add to cart (2)`);
});
