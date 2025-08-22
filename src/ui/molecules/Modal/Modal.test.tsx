// React testing library
import { render, screen, fireEvent } from "@testing-library/react";
// Component
import Modal from "./Modal";

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    title: "Test Modal",
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
    primaryText: "Save",
    secondaryText: "Cancel",
    onPrimary: jest.fn(),
    onSecondary: jest.fn(),
    primaryDisabled: false,
    secondaryDisabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '<div id="rootPortal" />';
  });

  it("renders nothing when isOpen is false", () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders modal with title and children", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Close"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onPrimary when primary button is clicked", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText("Save"));
    expect(defaultProps.onPrimary).toHaveBeenCalled();
  });

  it("calls onSecondary when secondary button is clicked", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onSecondary).toHaveBeenCalled();
  });

  it("calls onClose when onSecondary is not provided", () => {
    render(<Modal {...defaultProps} onSecondary={undefined} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("disables primary and secondary buttons when props are true", () => {
    render(
      <Modal
        {...defaultProps}
        primaryDisabled={true}
        secondaryDisabled={true}
      />
    );
    expect(screen.getByText("Save")).toBeDisabled();
    expect(screen.getByText("Cancel")).toBeDisabled();
  });
});
