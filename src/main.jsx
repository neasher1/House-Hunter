import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router/Router";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode className="max-w-[1200px] mx-auto">
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
