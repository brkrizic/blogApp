import { Link } from "react-router-dom";

type PostType = {
    id: string;
    title: string;
    slug: string;
    author: string;
    date: string;
    coverImage: string;
    excerpt: string;
    tags: string[];
  };

  type PostProps = {
    post: PostType;
  };
  

const Post = ({post}: PostProps) => {
    return (
        <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
            <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-3">
                    By {post.author} • {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm">{post.excerpt}</p>
                </div>
                <div className="mt-4">
                <Link
                    to={`/${post.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                >
                    Read more →
                </Link>
                </div>
            </div>
        </div>
    );
};
export default Post;