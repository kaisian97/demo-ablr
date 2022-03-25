import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const Child = () => {
  throw new Error();
};

const renderProviders = (ui) => render(ui, {});

describe("Error Boundary", () => {
  it(`should render error boundary component when there is an error`, () => {
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {});

    renderProviders(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    const errorMessage = screen.getByText("Something went wrong");
    expect(errorMessage).toBeDefined();

    spy.mockRestore();
  });
});
