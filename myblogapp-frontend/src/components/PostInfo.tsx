import { useEffect, useState, type ContextType } from "react";
import { PostViews } from "./PostViews";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import { useOutletContext } from "react-router-dom";

interface PostInfoProps {
  postLikes: number;
  postComments: number;
  likePost: () => void;
  isLiked: boolean;
}

type ContextType = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostInfo({ postLikes, postComments, likePost, isLiked }: PostInfoProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn) || null;
  const { setIsModalOpen } = useOutletContext<ContextType>();

  return (
    <div className="flex items-center space-x-6 text-gray-500 text-sm mt-4">
      {/* Views */}
        <PostViews/>

      {/* Likes */}
      <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500 transition">
        <svg
          className="w-5 h-5 text-gray-400"
          fill={isLiked ? "red": "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {isLoggedIn ? (
          <span onClick={likePost}>{postLikes || 0} likes</span>
        ) : (
          <span onClick={() => setIsModalOpen(true)}>{postLikes || 0} likes</span>
        )}
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
        <span>{postComments || 0} comments</span>
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
