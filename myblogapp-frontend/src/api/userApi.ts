import axios from "axios";
import { baseUrl } from "../constants/constants";

export type LoginPayload = {
    username: string;
    password: string;
};

export type RegisterPayload = {
    fullName: string;
    username: string;
    password: string;
};

export type LoginResponse = {
  user: Object;
};

export type RegisterResponse = {
    user: {
        id: number,
        username: string
    }
}

export type CheckAuthResponse = {
    id: number;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${baseUrl}/api/users/login`, payload, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await axios.post(`${baseUrl}/api/users/register`, payload);
    console.log(response);
    return response.data;
};

export const logoutUser = async (): Promise<any> => {
    const response = await axios.post(`${baseUrl}/private/logout`, {}, {
        withCredentials: true
    });
    console.log(response);
    return response.data;
}

export const checkAuthApi = async (): Promise<CheckAuthResponse> => {
    const token = localStorage.getItem("token");
    console.log("token: " + token);
    const response = await axios.get(`${baseUrl}/api/auth/check-session`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response);
    if(!response){
        throw new Error("Session expired or unauthorized");
    }
    return await response.data.json();
}; 
