import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../features/auth/authSlice";

function RefreshCall() {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshTokenCall = async () => {
      const response = await fetch("http://localhost:3000/api/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) return;

      const data = await response.json();
      if (data.accessToken) {
        dispatch(setAccessToken(data.accessToken));
      }
    };

    refreshTokenCall();
  }, [dispatch]);

  return null;
}

export default RefreshCall;
