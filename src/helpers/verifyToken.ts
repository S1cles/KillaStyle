import useAuth from "@/store/useAuth";
import { parseJwt } from "./parseJwt";

const tokenExpirationTime = 1; 

export const verifyToken = async () => {
  try {
    const token = useAuth.getState().token;
    if (token) {
      const { exp } = parseJwt(token);
      const expirationTime = exp * 1000;
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        useAuth.getState().logOut();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
