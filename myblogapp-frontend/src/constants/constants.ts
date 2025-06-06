

export const modalRoot = document.getElementById("modal-root");

export const baseUrl = "http://localhost:8080";

export const API_URL_POST = "http://localhost:8080/api/posts";

export interface PostType {
    id: number;
    title: string;
    slug: string;
    user: UserType;
    createdAt: string;
    image: string;
    content: string;
    tags: string[];
}

export interface UserType {
    id: number;
    fullname: string;
    username: string;
    password: string;
}

