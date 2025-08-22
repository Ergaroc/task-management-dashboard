// Testing libraries
import { render } from "@testing-library/react";
// Component
import { LoaderSpinner } from "./LoaderSpinner";

describe("LoaderSpinner", () => {
  it("LoaderSpinner should render correctly", () => {
    const { container } = render(<LoaderSpinner size={16} />);

    const loadingComponent =
      container.getElementsByClassName("a-loaderSpinner");

    expect(loadingComponent.length).toBe(1);
  });
});
