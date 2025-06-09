import { NavLink, useOutletContext, useParams } from "react-router-dom";
import { usePostApi } from "../hooks/usePostApi";
import { useCallback, useEffect, useState } from "react";
import { API_URL_POST, type PostType } from "../constants/constants";
import Comments from "../components/Comments";
import PostInfo from "../components/PostInfo";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";

type ContextType = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState<PostType>();
    const [likes, setLikes] = useState<number>(0);
    const [commentsCount, setCommetsCount] = useState<number>(0);
    const [comments, setComments] = useState<any[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn) || null;
    const { setIsModalOpen } = useOutletContext<ContextType>();

    const { getPostById, postLikePost, postUnlikePost, getComments, addComment } = usePostApi();

    const fetchPost = async () => {
      if(!id) return null;

      const postId = Number(id);
      const result = await getPostById(postId);
      setPost(result.post);
      setLikes(result.likes);
      setCommetsCount(result.comments);
    };

    useEffect(() => {
      fetchPost();
    }, [isLiked]);

    const getPostComments = async () => {
      const result = await getComments(Number(id));
      console.log(result);
      setComments(result);
    };

    const likePost = async () => {
      if(!isLiked){
        const result = await postLikePost(Number(id));
        setIsLiked(true);
      } else {
        const result = await postUnlikePost(Number(id));
        setIsLiked(false);
      }
    };

    const handleSubmitComment = useCallback(async (e: React.FormEvent, currentComment: string) => {
      e.preventDefault();

      if(!isLoggedIn){
        setIsModalOpen(true);
      }

      if (!currentComment.trim()) return;

      await addComment(Number(id), currentComment);
      await getPostComments();
      
      fetchPost();
    }, [addComment, id]);

    useEffect(() => {
      fetchPost();
      getPostComments();
    }, [id]);

    if(!post) return <div>Loading...</div>
    
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl text-gray-800">
        <img
          src={`http://localhost:8080${post?.image}`}
          alt={post?.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
  
        <h1 className="text-4xl font-bold mb-2 text-blue-600">{post?.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          By <NavLink 
                to={"/userProfile"} 
                className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition"

              >
                  {post?.user?.username}
              </NavLink> • {new Date(post?.createdAt).toLocaleDateString()}
        </p>
  
        {/* Render content as markdown-style */}
        <div className="prose prose-blue max-w-none">
          {post.content.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
  
        {/* Tags */}
        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 mb-2">Tags:</h3>
          {/* <div className="flex flex-wrap gap-2">
            {post?.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div> */}
        </div>
        <PostInfo postLikes={likes} postComments={commentsCount} likePost={likePost} isLiked={isLiked}/>
        <Comments comments={comments} handleSubmitComment={handleSubmitComment}/>
      </div>
    );
}
export default PostDetails;