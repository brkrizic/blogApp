import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;       // e.g. user ID or username
  exp: number;       // expiration timestamp
  iat: number;       // issued at timestamp
  [key: string]: any; // other custom claims
}

export const decodeToken = (token: any) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
