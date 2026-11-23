import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setAuthLoading, setCredentials } from "./authSlice";
import axios from "axios";
import { API_BASE_URL } from "../../api/axios";
import { getUserFromAccessToken } from "./accessToken";

function AuthInitalizer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function restoreSession() {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/refresh`,
          {},
          {
            withCredentials: true,
          },
        );
        const user = getUserFromAccessToken(response.data.accessToken);

        if (!user) {
          throw new Error("Refresh response contains an invalid access token");
        }

        dispatch(setCredentials({ accessToken: response.data.accessToken, user }));
      } catch (error) {
        if (!error.response || error.response.status !== 401) {
          console.error("Failed to restore session:", error.message);
        }
        dispatch(logout());
      } finally {
        dispatch(setAuthLoading(false));
      }
    }
    restoreSession();
  }, [dispatch]);
  return children;
}

export default AuthInitalizer;
