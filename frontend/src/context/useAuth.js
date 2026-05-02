import { useContext } from "react";
import { AuthContext } from "./sessionContext";

export const useAuth = () => useContext(AuthContext);
