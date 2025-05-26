import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { usePostApi } from "../../hooks/usePostApi";

// Dummy data for user's posts
type Post = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

const MyPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const { deletePost } = usePostApi();

  // Fetch posts data for the logged-in user (Replace with API call)
  useEffect(() => {
    // This is just dummy data for the purpose of the example
    setPosts([
      { id: "1", title: "How to Build a React App", date: "2025-05-01", excerpt: "A detailed guide on building a React app." },
      { id: "2", title: "Introduction to TypeScript", date: "2025-05-05", excerpt: "Getting started with TypeScript." },
      { id: "3", title: "CSS Grid vs Flexbox", date: "2025-05-10", excerpt: "Comparing CSS Grid and Flexbox." }
    ]);
  }, []);

  // Dummy delete function (replace with API call)
  const handleDelete = async (postId: Number) => {
    // Logic to delete the post from backend can be added here
    const result = await deletePost(postId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Posts</h1>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                {/* Post Title */}
                <h2 className="text-xl font-semibold text-gray-800">
                  <Link to={`/post/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* Post Metadata */}
                <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
              </div>

              {/* Excerpt */}
              <p className="text-gray-700 mt-2">{post.excerpt}</p>

              {/* Post Actions */}
              <div className="flex justify-end space-x-4 mt-4">
                {/* Edit Button */}
                <Link
                  to={`/account/myposts/createEditPost/${post.id}`}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <FaEdit className="mr-1" />
                  Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:underline flex items-center"
                >
                  <FaTrashAlt className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPostsPage;
