import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ClubProfile from "./pages/ClubProfile";
import SchoolPage from "./pages/SchoolPage";
import ClassProfile from "./pages/ClassProfile";
import UserProfile from "./pages/UserProfile";

const Router = () => {
  const url =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://serenebook-production.up.railway.app";

  const router = createBrowserRouter([
    { path: "/", element: <Home url={url} /> },
    { path: "/login", element: <Login url={url} /> },
    { path: "/profile/:profileID", element: <UserProfile url={url} /> },
    { path: "/class/:profileID", element: <ClassProfile url={url} /> },
    { path: "/profile/:profileID", element: <SchoolPage url={url} /> },
    { path: "/profile/:profileID", element: <ClubProfile url={url} /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
