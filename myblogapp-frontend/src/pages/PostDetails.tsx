import { NavLink, useParams } from "react-router-dom";
import { usePostApi } from "../hooks/usePostApi";
import { useEffect, useState } from "react";
import { type PostType } from "../constants/constants";
import Comments from "../components/Comments";
import PostInfo from "../components/PostInfo";


const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState<PostType>();

    const { getPostById } = usePostApi();

    const fetchPost = async (id: string | undefined) => {
      if(!id) return null;

      const postId = Number(id);
      const result = await getPostById(postId);
      setPost(result);
    };

    useEffect(() => {
      fetchPost(id);
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
        <PostInfo/>
        <Comments/>
      </div>
    );
}
export default PostDetails;