import Post from "./Post";

type Post = {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
  tags: string[];
};

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Post post={post}/>
      ))}
    </div>
  );
};

export default PostList;
