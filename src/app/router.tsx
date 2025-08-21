import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const TasksPage = lazy(() =>
  import("@/pages").then((module) => ({
    default: module.TasksPage,
  }))
);
const AppLayout = lazy(() =>
  import("@/ui/templates/AppLayout/AppLayout").then((module) => ({
    default: module.AppLayout,
  }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/tasks" replace /> },
      { path: "tasks", element: <TasksPage /> },
    ],
  },
]);
