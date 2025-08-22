// React
import { lazy } from "react";
// React Router
import { createBrowserRouter, Navigate } from "react-router";
// Pages
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
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
const TaskDetailsPage = lazy(() =>
  import("@/pages").then((module) => ({
    default: module.TaskDetailsPage,
  }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/tasks" replace /> },
      { path: "tasks", element: <TasksPage /> },
      {
        path: "/tasks/:id",
        element: <TaskDetailsPage />,
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
