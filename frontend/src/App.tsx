import React from "react";
import "./App.scss";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/PublicPages/SignIn/SignIn";
import SignUp from "./pages/PublicPages/SignUp/SignUp";
import NotFound from "./pages/PublicPages/NotFound/NotFound";
import { PrivateRoutes, PublicRoutes } from "./models";
import AuthGuard from "./guards/auth.guard";
import ChefPortal from "./pages/AuthorizedPages/ChefPortal/ChefPortal";
import CustomerPortal from "./pages/AuthorizedPages/CustomerPortal/CustomerPortal";
import RoleGuard from "./guards/role.guard";
import { Roles } from "./models/roles";
import { Provider } from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={PrivateRoutes.CHEF_PORTAL} />,
  },
  {
    path: PublicRoutes.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: PublicRoutes.SIGN_UP,
    element: <SignUp />,
  },

  {
    path: PublicRoutes.NOT_FOUND,
    element: <NotFound />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <RoleGuard role={Roles.CHEF}></RoleGuard>,
        children: [
          {
            path: PrivateRoutes.CHEF_PORTAL,
            element: <ChefPortal />,
          },
        ],
      },
      {
        element: <RoleGuard role={Roles.CUSTOMER}></RoleGuard>,
        children: [
          {
            path: PrivateRoutes.CUSTOMER_PORTAL,
            element: <CustomerPortal />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
