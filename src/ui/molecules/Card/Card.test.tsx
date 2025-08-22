// React testing library
import { render, screen, fireEvent } from "@testing-library/react";
// React router
import { MemoryRouter } from "react-router";
// Interfaces
import type { Task } from "@/interfaces";
// Component
import { Card } from "./Card";

jest.mock("@/icons/components", () => ({
  ChevronDownDouble: () => <svg data-testid="chevron-down" />,
  ChevronSelectorHorizontal: () => <svg data-testid="chevron-horizontal" />,
  ChevronUpDouble: () => <svg data-testid="chevron-up" />,
  Drag: () => <svg data-testid="drag-icon" />,
}));

jest.mock("@/utils", () => ({
  formatDate: (date: string) => `Formatted: ${date}`,
}));

const mockNavigate = jest.fn();
jest.mock("react-router", () => {
  const actual = jest.requireActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderCard = (props: Partial<Task> = {}) =>
  render(
    <MemoryRouter>
      <Card
        id="1"
        title="Test Task"
        description="Test Description"
        dueDate="2024-06-01"
        priority="High"
        status={props.status || "To Do"}
        {...props}
      />
    </MemoryRouter>
  );

describe("Card", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title, description, and due date", () => {
    renderCard();
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Formatted: 2024-06-01")).toBeInTheDocument();
  });

  it("renders drag icon", () => {
    renderCard();
    expect(screen.getByTestId("drag-icon")).toBeInTheDocument();
  });

  it("renders high priority icon", () => {
    renderCard({ priority: "High" });
    expect(screen.getByTestId("chevron-up")).toBeInTheDocument();
  });

  it("renders medium priority icon", () => {
    renderCard({ priority: "Medium" });
    expect(screen.getByTestId("chevron-horizontal")).toBeInTheDocument();
  });

  it("renders low priority icon", () => {
    renderCard({ priority: "Low" });
    expect(screen.getByTestId("chevron-down")).toBeInTheDocument();
  });

  it("shows fallback for missing description and due date", () => {
    renderCard({ description: undefined, dueDate: undefined });
    expect(
      screen.getByText("This task has no description or due date.")
    ).toBeInTheDocument();
  });

  it("shows fallback for missing description only", () => {
    renderCard({ description: undefined });
    expect(screen.getByText("No description provided.")).toBeInTheDocument();
  });

  it("shows fallback for missing due date only", () => {
    renderCard({ dueDate: undefined });
    expect(screen.getByText("No due date set")).toBeInTheDocument();
  });

  it("navigates to task details on click", () => {
    renderCard();
    fireEvent.click(screen.getByRole("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/tasks/1");
  });

  it("applies correct priority class", () => {
    renderCard({ priority: "Medium" });
    expect(screen.getByRole("button", { name: /test task/i })).toHaveClass(
      "m-card--medium"
    );
  });
});
