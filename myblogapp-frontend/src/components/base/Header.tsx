import { useCallback } from "react";
import SearchBar from "../SearchBar";
import { NavLink, useNavigate } from "react-router-dom";

type User = {
    id: number | null;
    username: string | undefined;
}

type HeaderProps = {
    setSearchQuery: (query: string) => void;
    user: User | null;
    isLoggedIn: boolean | null;
    onCreatePost: () => void;
}

const Header = ({ setSearchQuery, user, isLoggedIn, onCreatePost }: HeaderProps) => {
    const navigate = useNavigate();

    const onSearchClick = useCallback((searchVal: string) => {
        navigate("/");
        setSearchQuery(searchVal);
    }, []);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo / Title*/}
                <NavLink to="/" className="text-2xl font-bold text-black-600">
                    MyBlog
                </NavLink>

                {/* Search Bar */}
                <SearchBar onSearchClick={onSearchClick}/>

                {/* Navigation */}
                <nav className="space-x-4 text-gray-700 font-medium">
                    <button 
                        className="px-4 py-2 bg-green-500 text-white border border-black rounded hover:bg-green-600 transition"
                        onClick={onCreatePost}    
                    >
                        + Create Post
                    </button>
                    <NavLink to="/" className={({ isActive }) => 
                        isActive ? "text-blue-500" : "hover:text-blue-500 transition"
                    }>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => 
                        isActive ? "text-blue-500" : "hover:text-blue-500 transition"
                    }>
                        About
                    </NavLink>
                    {/* <NavLink to="/posts" className={({ isActive }) => 
                        isActive ? "text-blue-500" : "hover:text-blue-500 transition"
                    }>
                        Posts
                    </NavLink> */}
                    {user && isLoggedIn && (
                        <NavLink to="/account/dashboard" className={({ isActive }) => 
                            isActive ? "text-blue-500" : "hover:text-blue-500 transition"
                        }>
                            Account
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
}
export default Header;