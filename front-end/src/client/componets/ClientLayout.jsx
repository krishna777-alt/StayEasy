import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

function ClientLayout() {
  return (
    <div>
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </div>
  );
}

export default ClientLayout;
