import GameItemsPage from "@/pages/GameItemsPage";
import LogInPage from "@/pages/LogInPage";
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

const AppRoutes = (): ReactElement | null => {
  const navigationRoutes: { path: string; element: ReactElement }[] = [
    { path: "/", element: <GameItemsPage /> },
    { path: "/login", element: <LogInPage /> },
  ];
  return (
    <Routes>
      {navigationRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
