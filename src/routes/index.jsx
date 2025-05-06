import { Routes, Route } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { AuthorizedRoutes, ProtectedRoutes } from "./routes";
import { AuthRouteHelper, ProtectedRouteHelper } from "./helpers";
import FullPageLoader from "../components/Loader";

function AppRoutes({ isAuthenticated }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate delay or wait for authentication status
    const timeout = setTimeout(() => setLoading(false), 500); // Adjust based on real logic
    return () => clearTimeout(timeout);
  }, []);

  const renderAuthorizedRoutes = () =>
    AuthorizedRoutes.map(({ component: Component, slug }, index) => (
      <Route
        path={slug}
        key={`auth-${index}`}
        element={
          <AuthRouteHelper isAuthenticated={isAuthenticated}>
            <Component />
          </AuthRouteHelper>
        }
      />
    ));

  const renderProtectedRoutes = () =>
    ProtectedRoutes.map(({ component: Component, slug, parameter = null }, index) => (
      <Route
        path={parameter ? `${slug}${parameter}` : slug}
        key={`protected-${index}`}
        element={
          <ProtectedRouteHelper isAuthenticated={isAuthenticated}>
            <Component />
          </ProtectedRouteHelper>
        }
      />
    ));

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>{[...renderAuthorizedRoutes(), ...renderProtectedRoutes()]}</Routes>
    </Suspense>
  );
}

export default AppRoutes;
