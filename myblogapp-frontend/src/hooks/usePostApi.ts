import axios from "axios";
import { API_URL_POST, baseUrl } from "../constants/constants";
import { useCallback } from "react";


export const usePostApi = () => {

    const getAllPosts = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL_POST}/posts`, {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            });
            return response.data;
        } catch (error) {
            
        }
    }, []);

    const getPostById = useCallback(async (id: number) => {
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
    }, []);

    const createPost = useCallback(async (formData: Object) => {
        try {
            const response = await axios.post(`${API_URL_POST}/private/create`, formData, {
                withCredentials: true
            });
            console.log(response);
            return response.data;
        } catch (error) {
            
        }
    }, []);

    const updatePost = useCallback(async (postId: number, postData: Object) => {
        try {
            const response = await axios.put(`${API_URL_POST}/private/${postId}`, postData, {
                withCredentials: true,
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            });
            return response.data;
        } catch (error) {
            
        }
    }, []);

    const deletePost = useCallback(async (id: number) => {
        try {
            const response = await axios.delete(`${API_URL_POST}/private/${id}`, {
                withCredentials: true,
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            
        }
    }, []);

    const getPostByUserId = useCallback(async (userId: number | null) => {
        if(userId == null) return [];
        try {
            const response = await axios.get(`${API_URL_POST}/private/user/${userId}`, {
                withCredentials: true,
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }, []);

    const postsCount = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL_POST}/private/postCount`, {
                withCredentials: true,
            });
            console.log(response);
            return response.data;
        } catch (error) {
            
        }
    }, []);

    const getLikesByPost = useCallback(async (postId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/postLikes/${postId}`, {
                withCredentials: true,
            })
            console.log(response);
            return response.data;
        } catch (error) {
            
        }
    }, []);

    const postLikePost = useCallback(async (postId: number) => {
        try {
            const response = await axios.post(`${API_URL_POST}/private/${postId}/like`, {}, {
                withCredentials: true
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }, []);

    const postUnlikePost = useCallback(async(postId: number) => {
        try {
            const response = await axios.delete(`${API_URL_POST}/private/${postId}/unlike`, {
                withCredentials: true
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }, []);

    const addComment = useCallback(async (postId: number, content: string[]) => {
        try {
            const response = await axios.post(`${API_URL_POST}/private/comments/${postId}`, {content}, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getComments = useCallback(async (postId: number) => {
        try {
            const response = await axios.get(`${API_URL_POST}/comments/${postId}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }, []);


    return ({ 
        getAllPosts, 
        getPostById, 
        createPost, 
        updatePost, 
        deletePost, 
        getPostByUserId, 
        postsCount,
        getLikesByPost,
        postLikePost,
        postUnlikePost,
        addComment,
        getComments 
    });
}