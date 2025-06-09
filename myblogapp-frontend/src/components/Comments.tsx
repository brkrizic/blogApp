import { useState } from "react";

interface CommentsProps {
  comments: any[];
  handleSubmitComment: (e :React.FormEvent, currentComment: string) => void;
}

export default function Comments({ comments, handleSubmitComment }: CommentsProps) {
  const [currentComment, setCurrentComment] = useState<string>("");

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="text-md font-semibold mb-2">{comments.length} Comments</h4>

      {/* Add comment input */}
      <form className="mt-3 flex gap-2" onSubmit={(e) => {
        handleSubmitComment(e, currentComment);
        setCurrentComment(""); // Reset input
      }}
      >
        <input
          type="text"
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>

      {/* Render comments dynamically */}
      <ul className="space-y-2 mt-4">
        {comments.map((comment, index) => (
          <li key={index} className="bg-gray-50 p-2 rounded">
            <p className="text-sm">
              <span className="font-semibold">{comment.user.username}:</span> {comment.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
