import { useAppContext } from "@/context/AppContext";
import GameItemsPage from "@/pages/GameItemsPage";
import LibraryPage from "@/pages/LibraryPage";
import LogInPage from "@/pages/LogInPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import SignUpPage from "@/pages/SignUpPage";
import { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = (): ReactElement | null => {
  const { currentUser } = useAppContext();
  const isAuthenticated: boolean = !!currentUser;
  const navigationRoutes: {
    path: string;
    element: ReactElement;
    isAuthenticated?: boolean;
  }[] = [
    { path: "/", element: <GameItemsPage /> },
    { path: "/library", element: <LibraryPage />, isAuthenticated: true },
    { path: "/settings", element: <SettingsPage />, isAuthenticated: true },
    {
      path: `/u/${currentUser?.username}`,
      element: <ProfilePage />,
      isAuthenticated: true,
    },
    { path: "/login", element: <LogInPage />, isAuthenticated: false },
    { path: "/signup", element: <SignUpPage />, isAuthenticated: false },
    { path: "*", element: <p>Page not found</p> },
  ];
  return (
    <Routes>
      {navigationRoutes.map((route) => {
        if (route.isAuthenticated === true && !isAuthenticated) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Navigate to="/login" replace />}
            />
          );
        }
        if (route.isAuthenticated === false && isAuthenticated) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Navigate to="/" replace />}
            />
          );
        }
        return (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
