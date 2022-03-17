import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  console.log(params.get("accessToken"));
  console.log(params);

  useEffect(() => {
    const accessToken =
      localStorage.getItem("accessToken") || params.get("accessToken"); // "TOKENS" are set when the user logs in
    console.log("user accesskone", accessToken);
    if (!accessToken) {
      navigate("/login");
    } else if (params.get("accessToken")) {
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    }
  }, []);
};
