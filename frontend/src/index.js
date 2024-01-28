import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import PaymentSuccess from "./components/paymentSuccess";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/paymentsuccess",
    element: <PaymentSuccess/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
