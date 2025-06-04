// hooks/useAuth.ts
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  return { token, user };
};
