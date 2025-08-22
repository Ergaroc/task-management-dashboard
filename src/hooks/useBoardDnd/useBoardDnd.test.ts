// React testing library
import { renderHook, act } from "@testing-library/react";
// Hook
import { useBoardDnd } from "./useBoardDnd";
// Interfaces
import type { Task } from "@/interfaces";
// Api
import * as tasksOperations from "@/api/tasksOperations";

const mockTasks: Task[] = [
  { id: "1", title: "Task 1", status: "To Do", priority: "Low" },
  { id: "2", title: "Task 2", status: "In Progress", priority: "Medium" },
  { id: "3", title: "Task 3", status: "Done", priority: "High" },
];

describe("useBoardDnd", () => {
  let setTasks: jest.Mock;

  beforeEach(() => {
    setTasks = jest.fn();
    jest.spyOn(tasksOperations, "updateTask").mockResolvedValue(mockTasks[0]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("groups tasks by status", () => {
    const { result } = renderHook(() => useBoardDnd(mockTasks, setTasks));
    expect(result.current.groups["To Do"]).toHaveLength(1);
    expect(result.current.groups["In Progress"]).toHaveLength(1);
    expect(result.current.groups["Done"]).toHaveLength(1);
  });

  it("sets activeTask on drag start", () => {
    const { result } = renderHook(() => useBoardDnd(mockTasks, setTasks));
    act(() => {
      result.current.onDragStart({
        active: { data: { current: { task: mockTasks[0] } } },
      } as any);
    });
    expect(result.current.activeTask).toEqual(mockTasks[0]);
  });

  it("clears activeTask on drag end", async () => {
    const { result } = renderHook(() => useBoardDnd(mockTasks, setTasks));
    act(() => {
      result.current.onDragStart({
        active: { data: { current: { task: mockTasks[0] } } },
      } as any);
    });
    await act(async () => {
      await result.current.onDragEnd({
        active: { data: { current: { task: mockTasks[0] } } },
        over: { id: "In Progress" },
      } as any);
    });
    expect(result.current.activeTask).toBeNull();
  });

  it("updates task status on drag end", async () => {
    const { result } = renderHook(() => useBoardDnd(mockTasks, setTasks));
    await act(async () => {
      await result.current.onDragEnd({
        active: { data: { current: { task: mockTasks[0] } } },
        over: { id: "In Progress" },
      } as any);
    });
    expect(setTasks).toHaveBeenCalledWith([
      { ...mockTasks[0], status: "In Progress" },
      mockTasks[1],
      mockTasks[2],
    ]);
    expect(tasksOperations.updateTask).toHaveBeenCalledWith("1", {
      status: "In Progress",
    });
  });

  it("does not update if status is unchanged", async () => {
    const { result } = renderHook(() => useBoardDnd(mockTasks, setTasks));
    await act(async () => {
      await result.current.onDragEnd({
        active: { data: { current: { task: mockTasks[0] } } },
        over: { id: "To Do" },
      } as any);
    });
    expect(setTasks).not.toHaveBeenCalled();
    expect(tasksOperations.updateTask).not.toHaveBeenCalled();
  });

  it("restores previous tasks on updateTask failure", async () => {
    (tasksOperations.updateTask as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );
    const { result } = renderHook(() => useBoardDnd(mockTasks, setTasks));
    await act(async () => {
      await result.current.onDragEnd({
        active: { data: { current: { task: mockTasks[0] } } },
        over: { id: "In Progress" },
      } as any);
    });
    expect(setTasks).toHaveBeenCalledWith(mockTasks);
  });

  it("does nothing if over is null", async () => {
    const { result } = renderHook(() => useBoardDnd(mockTasks, setTasks));
    await act(async () => {
      await result.current.onDragEnd({
        active: { data: { current: { task: mockTasks[0] } } },
        over: null,
      } as any);
    });
    expect(setTasks).not.toHaveBeenCalled();
  });

  it("does nothing if dragged is undefined", async () => {
    const { result } = renderHook(() => useBoardDnd(mockTasks, setTasks));
    await act(async () => {
      await result.current.onDragEnd({
        active: { data: { current: {} } },
        over: { id: "Done" },
      } as any);
    });
    expect(setTasks).not.toHaveBeenCalled();
  });
});
