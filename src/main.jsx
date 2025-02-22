import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import AuthProvider from "./provider/AuthProvider";
import Tasks from "./components/Tasks";
import AddTaskForm from "./components/AddTaskForm";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import Error from "./components/Error";
import PrivateRoute from "./provider/privetRoute/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateTask from "./components/UpdateTask";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/tasks",
        element: (
          <PrivateRoute>
            <Tasks></Tasks>
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/addTask",
        element: (
          <PrivateRoute>
            <AddTaskForm></AddTaskForm>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
        <Toaster />
      </AuthProvider>
    </div>
  </StrictMode>
);
