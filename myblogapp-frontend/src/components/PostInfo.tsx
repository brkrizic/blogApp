import { PostViews } from "./PostViews";

export default function PostInfo() {
  return (
    <div className="flex items-center space-x-6 text-gray-500 text-sm mt-4">
      {/* Views */}
        <PostViews/>

      {/* Likes */}
      <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500 transition">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>345 likes</span>
      </div>

      {/* Comments */}
      <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>12 comments</span>
      </div>

      {/* Shares */}
      <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500 transition">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M4 12v-3a4 4 0 0 1 4-4h8" />
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
        </svg>
        <span>8 shares</span>
      </div>

      {/* Reading Time */}
      <div className="flex items-center space-x-1">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>5 min read</span>
      </div>
    </div>
  );
}
