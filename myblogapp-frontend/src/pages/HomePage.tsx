import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { useOutletContext } from "react-router-dom";
import { usePostApi } from "../hooks/usePostApi";
import type { PostType } from "../constants/constants";


type ContextType = {
    searchQuery: string;
}

const HomePage = () => {
    const [posts, setPosts] = useState<PostType[]>([]);

    const { searchQuery } = useOutletContext<ContextType>();
    const { getAllPosts } = usePostApi();

    useEffect(() => {
        console.log("Search query updated:", searchQuery);
    }, [searchQuery]);

    const fetchPosts = async () => {
        const result = await getAllPosts();
        console.log(result);
        setPosts(result);
    }

    useEffect(() => {
        fetchPosts();
        //setPosts([dummyPost])
    }, []);

    return(
        <div>
            <PostList posts={posts}/>
        </div>
    );
}
export default HomePage;