import { useEffect } from "react";
import { refreshToken } from "../API/authapi";

const useLoggedin = (setUser) => {
  useEffect(() => {
    refreshToken().then((res) => {
      if (res.data.ok) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    });
  }, [setUser]);
};

export default useLoggedin;
