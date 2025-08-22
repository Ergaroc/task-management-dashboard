// React testing library
import { render, fireEvent } from "@testing-library/react";
// Component
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct variant class", () => {
    const { getByRole } = render(
      <Button onClick={() => {}} variant="red">
        Red Button
      </Button>
    );
    expect(getByRole("button")).toHaveClass("a-button--red");
  });

  it("renders leftIcon when provided", () => {
    const Icon = <span data-testid="icon">Icon</span>;
    const { getByTestId } = render(
      <Button onClick={() => {}} leftIcon={Icon}>
        With Icon
      </Button>
    );
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { getByRole } = render(
      <Button onClick={() => {}} className="custom-class">
        Custom Class
      </Button>
    );
    expect(getByRole("button")).toHaveClass("custom-class");
  });

  it("is disabled when disabled prop is true", () => {
    const { getByRole } = render(
      <Button onClick={() => {}} disabled>
        Disabled
      </Button>
    );
    expect(getByRole("button")).toBeDisabled();
  });

  it("uses the correct type attribute", () => {
    const { getByRole } = render(
      <Button onClick={() => {}} type="submit">
        Submit
      </Button>
    );
    expect(getByRole("button")).toHaveAttribute("type", "submit");
  });
});
