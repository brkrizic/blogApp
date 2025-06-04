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
  userId: number;
  token: string;
};

export type RegisterResponse = {
    user: {
        id: number,
        username: string
    }
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${baseUrl}/api/users/login`, payload);
  console.log(response);
  return response.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await axios.post(`${baseUrl}/api/users/register`, payload);
    console.log(response);
    return response.data;
}
