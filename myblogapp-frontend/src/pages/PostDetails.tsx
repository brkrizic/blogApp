import { useParams } from "react-router-dom";
import { dummyPost } from "../data/dummyPost";


const PostDetails = () => {
    const { id } = useParams(); // you'd normally fetch data based on this slug
    const post = dummyPost; // Replace this with actual fetch logic
    
    console.log(id);
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl text-gray-800">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
  
        <h1 className="text-4xl font-bold mb-2 text-blue-600">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          By {post.author} • {new Date(post.date).toLocaleDateString()}
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
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
}
export default PostDetails;