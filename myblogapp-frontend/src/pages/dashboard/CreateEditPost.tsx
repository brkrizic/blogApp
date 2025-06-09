import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostApi } from "../../hooks/usePostApi";
import ImageUpload from "../../components/ImageUpload";

export const CreateEditPost = () => {
  const postIdObj = useParams(); // Get route param, e.g. /posts/:postId 
  const postId = Number(postIdObj.id);

  const [isCreateMode, setIsCreateMode] = useState(!postId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLIC">("DRAFT");
  const [image, setImage] = useState<File | null>(null);
  const [existingObj, setExistingObj] = useState({});

  const navigate = useNavigate();

  const { createPost, updatePost, getPostById } = usePostApi();

  const handleUpdatePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    if(image) {
      formData.append("image", image); 
    } 
    await updatePost(postId, formData);
    navigate("/account/myposts");
  };

  const handleCreatePost = async (e: React.MouseEvent<HTMLButtonElement>) => {  
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    //formData.append("status", status);
    if(image) {
      formData.append("image", image); 
    } 

    await createPost(formData);
    navigate("/account/myposts");
    window.scrollTo(0, 0);
    
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle("");
    setContent("");
    setImage(null);
    //setStatus("");
  }

  const fetchPost = useCallback(async () => {
    const result = await getPostById(Number(postId));
    setExistingObj(result);

    setTitle(result.title || "");
    setContent(result.content || "");
    setImage(result.image || "");
    //setStatus(result.status || "DRAFT");

    console.log(existingObj);
  }, [postId]);

  useEffect(() => {
    if(postId){
      fetchPost();
    } 
  }, [fetchPost, postId]);

  const pageTitle = isCreateMode ? "Create Post" : "Edit Post";

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>

      <form className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input 
            type="text" 
            className="w-full border px-3 py-2 rounded"  
            value={title}
            onChange={(e) => setTitle(e.target.value)}  
          />
        </div>

        <div>
          {/* <label className="block font-medium">Image</label>
          <input 
            type="file"
            accept="/image/*" 
            className="w-full border px-3 py-2 rounded" 
            onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
            }} 
          /> */}
        <ImageUpload
          label="Post Image"
          existingImageUrl={ image ? `http://localhost:8080${image}` : undefined}
          onImageChange={(file) => setImage(file)}
        />

        </div>

        <div>
          <label className="block font-medium">Content</label>
          <textarea 
            className="w-full border px-3 py-2 rounded" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Tags</label>
          <input type="text" className="w-full border px-3 py-2 rounded" />
        </div>

        
        <div className="flex gap-3 mt-4">
          {isCreateMode ? (
              <button 
                onClick={handleCreatePost} 
                className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm">
                  Create
              </button>
          ) : (
              <button 
                onClick={handleUpdatePost}
                className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm">
                  Edit
              </button>
          )}

          <button 
            onClick={handleReset}
            className="flex-1 bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-200 shadow-sm">
              Reset
          </button>
        </div>
      </form>
    </div>
  );
};
