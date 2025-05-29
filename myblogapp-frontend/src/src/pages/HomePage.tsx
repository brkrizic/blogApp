import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { dummyPost } from "../data/dummyPost";

type Post = {
    id: string;
    title: string;
    slug: string;
    author: string;
    date: string;
    coverImage: string;
    excerpt: string;
    content: string;
    tags: string[];
  };
  

const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        setPosts([...posts, dummyPost]);
    }, []);

    return(
        <div>
            <PostList posts={posts}/>
        </div>
    );
}
export default HomePage;