import axios from "axios";
import { API_URL_POST } from "../constants/constants";
import { useAuth } from "./useAuth";


export const usePostApi = () => {
    const { token } = useAuth();

    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${API_URL_POST}/posts`, {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            });
            console.log(response);
            return response.data;
        } catch (error) {
            
        }
    };

    const getPostById = async (id: number) => {
        try {
            const response = await axios.get(`${API_URL_POST}/${id}`, {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const createPost = (postData: Object) => {
        console.log("post created", postData);
    };

    const deletePost = (postId: Number) => {
        console.log("post deleted", postId);
    }


    return ({ getAllPosts, getPostById, createPost, deletePost});
}