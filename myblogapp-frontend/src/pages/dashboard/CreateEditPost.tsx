import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CreateEditPost = () => {
  const postId = useParams(); // Get route param, e.g. /posts/:postId
  const [isCreateMode, setIsCreateMode] = useState(false);

  console.log(postId);

  useEffect(() => {
    // If postId is undefined or missing, it's "Create" mode
    if(Object.keys(postId).length === 0){
        setIsCreateMode(true);
    }
  }, [postId]);

  const pageTitle = isCreateMode ? "Create Post" : "Edit Post";

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>

      <form className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input type="text" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Slug</label>
          <input type="text" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Image</label>
          <input type="file" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Excerpt</label>
          <textarea className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Content</label>
          <textarea className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Tags</label>
          <input type="text" className="w-full border px-3 py-2 rounded" />
        </div>

        {isCreateMode ? (
            <button>Create</button>
        ) : (
            <button>Edit</button>
        )}

        <button>Reset</button>
      </form>
    </div>
  );
};
