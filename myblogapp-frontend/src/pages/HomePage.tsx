import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { dummyPost } from "../data/dummyPost";
import { useOutletContext } from "react-router-dom";

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
type ContextType = {
    searchQuery: string;
}

const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const { searchQuery } = useOutletContext<ContextType>();

    useEffect(() => {
        console.log("Search query updated:", searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        setPosts([dummyPost])
    }, []);

    return(
        <div>
            <PostList posts={posts}/>
        </div>
    );
}
export default HomePage;