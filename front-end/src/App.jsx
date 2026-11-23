import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ClientLayout from "./client/componets/ClientLayout";
import Home from "./client/pages/Home";
import About from "./client/pages/About";
import SearchResultsPage from "./client/pages/Search/Search";
import Hotels from "./client/pages/Hotels";
import ContactPage from "./client/pages/Contact";
import Login from "./client/pages/Login";
import Signup from "./client/pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import HotelDashboard from "./Hotel/pages/HotelDashBord";
import AdminDashboard from "./Admin/pages/AdminPanel";
import HotelDetailsPage from "./client/pages/HotelDetails";
import RoomsPage from "./client/pages/Rooms";
import RoomDetailsPage from "./client/pages/RoomDetails";
import PaymentPage from "./client/pages/Payment";
import BookingPage from "./client/pages/Booking";
import AccountPage from "./client/pages/Account";
import PaymentStatus from "./client/componets/PymentStatus";

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
      { path: "hotels/hotelDetails", element: <HotelDetailsPage /> },
      { path: "hotel/hotelDetails/rooms", element: <RoomsPage /> },
      { path: "hotel/hotelDetails/rooms/:hotelId", element: <RoomsPage /> },
      { path: "pay", element: <PaymentStatus /> },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "hotel/hotelDetails/rooms/roomDetails/:roomId",
        element: <RoomDetailsPage />,
      },
    ],
  },
  {
    path: "/hotel_module",
    element: (
      <ProtectedRoute allowedRoles={["hotel", "admin"]}>
        <HotelDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin_module",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
