import React from "react";
import ReactDOM from "react-dom/client";
import Releases from "./releases";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Variants from "./variants";
const router = createBrowserRouter([
  {
    path: "/variant/:id",
    element: <Variants />,
  },
  {
    path: "/",
    element: <Releases />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
  </React.StrictMode>
);
