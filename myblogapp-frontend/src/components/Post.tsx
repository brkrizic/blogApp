import { Link } from "react-router-dom";
import type { PostType } from "../constants/constants";
import { PostViews } from "./PostViews";

  type PostProps = {
    post: PostType;
  };
  

const Post = ({post}: PostProps) => {
    return (
        <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
            {post?.image && (
              <img
                src={`http://localhost:8080${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-3">
                    By {post.user?.username} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm">{post.content}</p>
                </div>
                <div className="flex mt-4">
                <Link
                    to={`/${post.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium mr-40"
                >
                    Read more →
                </Link>
                <PostViews/>
                </div>
            </div>
        </div>
    );
};
export default Post;