import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaCommentAlt, FaFileAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { usePostApi } from "../../hooks/usePostApi";


const DashboardPage = () => {
  const id  = useSelector((state: RootState) => state.auth?.user?.id);
  const { postsCount } = usePostApi();

  const [countPost, setCountPost] = useState<number>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchCountPosts = useCallback(async () => {
    if(id){
        const result = await postsCount();
        console.log(result);
        setCountPost(result);
    }

  }, [id]);

  console.log(countPost);
  
  useEffect(() => {
    fetchCountPosts();
  }, [fetchCountPosts]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to your Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaFileAlt className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Posts</h3>
              <p className="text-gray-500">{countPost} Posts</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaCommentAlt className="text-green-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Comments</h3>
              <p className="text-gray-500">{countPost} Comments</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUserAlt className="text-purple-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Followers</h3>
              <p className="text-gray-500">{countPost} Followers</p>
            </div>
          </div>
        </div>

        {/* Links to other sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100 transition">
            <Link to="/account/posts" className="text-blue-600 font-medium hover:underline">
              Manage Posts
            </Link>
            <p className="text-gray-500">View and manage your blog posts</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100 transition">
            <Link to="/account/comments" className="text-green-600 font-medium hover:underline">
              Manage Comments
            </Link>
            <p className="text-gray-500">Moderate and manage comments</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100 transition">
            <Link to="/account/settings" className="text-purple-600 font-medium hover:underline">
              Account Settings
            </Link>
            <p className="text-gray-500">Update your account details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
