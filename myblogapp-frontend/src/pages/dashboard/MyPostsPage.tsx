import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { usePostApi } from "../../hooks/usePostApi";
import { type PostType } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import DeleteModal from "../../components/modals/DeleteModal";
import PostInfo from "../../components/PostInfo";

const MyPostsPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | undefined>(undefined);

  // Get all API functions from one usePostApi call
  const { getPostByUserId, deletePost } = usePostApi();
  const { user } = useAuth();

  // Stable fetch function, update posts
  const fetchPostsByUser = useCallback(async () => {
    if (user?.id) {
      const result = await getPostByUserId(user.id);
      console.log(result);
      setPosts(result);
    }
  }, [user?.id, getPostByUserId]);

  // Fetch posts on mount and when user changes
  useEffect(() => {
    fetchPostsByUser();
  }, [fetchPostsByUser]);

  // Delete post and refresh list
  const onDelete = async (postId: number) => {
      await deletePost(postId);
      setIsDeleteModalOpen(false);
      fetchPostsByUser(); // Refresh after delete
      document.body.style.overflow = "visible";
    };

  const deleteClick = (postId: number) => {
    setSelectedPost(postId);
    setIsDeleteModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsDeleteModalOpen(false);
    document.body.style.overflow = "visible";
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
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Excerpt */}
              <p className="text-gray-700 mt-2">{post.content}</p>

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
                  onClick={() => deleteClick(post.id)}
                  className="text-red-600 hover:underline flex items-center"
                >
                  <FaTrashAlt className="mr-1" />
                  Delete
                </button>
              </div>
              <PostInfo/>
            </div>
          ))}
        </div>
      </div>

      <DeleteModal
        title={"Delete Post"}
        description={"Are you sure for delete?"}
        onClose={handleClose}
        isOpen={isDeleteModalOpen}
        selectedPost={selectedPost}
        handleDelete={onDelete}
      />
    </div>
  );
};

export default MyPostsPage;
