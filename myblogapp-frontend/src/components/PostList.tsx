import type { PostType } from "../constants/constants";
import Post from "./Post";


type PostListProps = {
  posts: PostType[];
};

const PostList = ({ posts }: PostListProps) => {

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  );
};

export default PostList;
