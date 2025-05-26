

export const usePostApi = () => {
    const getAllPosts = () => {
        console.log("posts");
    };

    const getPostById = () => {
        console.log("post");
    };

    const createPost = (postData: Object) => {
        console.log("post created", postData);
    };

    const deletePost = (postId: Number) => {
        console.log("post deleted", postId);
    }


    return ({ getAllPosts, getPostById, createPost, deletePost});
}