import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setAuthLoading, setCredentials } from "./authSlice";
import axios from "axios";

function AuthInitalizer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function restoreSection() {
      try {
        const responce = await axios.post(
          `http://localhost:3000/api/refresh`,
          {},
          {
            withCredentials: true,
          },
        );
        dispatch(
          setCredentials({
            accessToken: responce.data.accessToken,
            user: responce.data.user,
          }),
        );
      } catch (error) {
        console.log("No active Section", error.message);
        dispatch(logout());
      } finally {
        dispatch(setAuthLoading(false));
      }
    }
    restoreSection();
  }, [dispatch]);
  return children;
}

export default AuthInitalizer;
