import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ClientLayout from "./client/componets/ClientLayout";
import Home from "./client/pages/Home";
import About from "./client/pages/About";
import SearchResultsPage from "./client/pages/Search/Search";
import Hotels from "./client/pages/Hotels";
import Rooms from "./client/pages/Rooms";
import ContactPage from "./client/pages/Contact";
import Login from "./client/pages/Login";
import Signup from "./client/pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import HotelDashboard from "./hotel/pages/HotelDashBord";
import AdminDashboard from "./Admin/pages/AdminPanel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: (
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      { path: "contact", element: <ContactPage /> },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchResultsPage />
          </ProtectedRoute>
        ),
      },
      { path: "hotels", element: <Hotels /> },
      { path: "hotel/rooms", element: <Rooms /> },
    ],
  },
  {
    path: "/hotel_module",
    element: <HotelDashboard />,
  },
  {
    path: "/admin_module",
    element: <AdminDashboard />,
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
