import { lazy } from "react";
import { ROUTE_SLUGS, AUTH_ROUTE_SLUGS } from "../config/constants";

export const ProtectedRoutes = [
  {
    slug: ROUTE_SLUGS.ROOT,
    component: lazy(() => import("../components/Authentication/Login")),
    exact: true,
  },
  {
    slug: ROUTE_SLUGS.LOGIN,
    component: lazy(() => import("../components/Authentication/Login")),
    exact: true,
  },
  {
    slug: ROUTE_SLUGS.ForgetPassword,
    component: lazy(() => import("../components/Authentication/ForgetPassword")),
    exact: true,
  },
  {
    slug: ROUTE_SLUGS.ResetPassword,
    component: lazy(() => import("../components/Authentication/ResetPassword")),
    exact: true,
  },
    
];

export const AuthorizedRoutes = [
     {
        slug: AUTH_ROUTE_SLUGS.ROOT,
        component: lazy(() => import("../components/Home/Home")),
      },

    




  
  
];
