// React testing library
import { render, screen } from "@testing-library/react";
// Component
import { TaskModalForm } from "./TaskModalForm";

jest.mock("@/ui/molecules", () => ({
  Modal: ({ children, ...props }: any) => (
    <div data-testid="modal" {...props}>
      {children}
    </div>
  ),
}));
jest.mock("@/api/tasksOperations", () => ({
  createTask: jest.fn(),
  updateTask: jest.fn(),
}));

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  mode: "create" as const,
  onSuccess: jest.fn(),
};

describe("TaskModalForm", () => {
  it("renders create mode with empty fields", () => {
    document.body.innerHTML = "";
    render(<TaskModalForm {...defaultProps} />);
    expect(screen.getByText("Title *")).toBeInTheDocument();
    expect(screen.getByLabelText(/Title \*/)).toHaveValue("");
    expect(screen.getByLabelText(/Description/)).toHaveValue("");
  });
});
