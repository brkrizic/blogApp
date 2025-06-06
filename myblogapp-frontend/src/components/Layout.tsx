import Header from "./base/Header.tsx";
import Footer from "./base/Footer.tsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, type Dispatch, type SetStateAction } from "react";
import UserSidebar from "./base/UserSidebar.tsx";
import AuthModal from "./modals/AuthModal.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store.ts";

type LayoutProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const Layout = ({ isModalOpen, setIsModalOpen, searchQuery, setSearchQuery }: LayoutProps) => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith("/account");

  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user) || null;
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn) || null;

  const handleCreatePost = useCallback(() => {
    if(!user && !isLoggedIn){
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      navigate("/account/myposts/createEditPost");
      window.location.reload();
    }
  }, [user, isLoggedIn]);


  useEffect(() => {
    if(isLoggedIn){
      setIsModalOpen(false);
    }
  }, [user, isLoggedIn]);

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'visible';
  }, [setIsModalOpen]);

  //console.log(searchQuery);
  //TODO: Pass search query to body content

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      {/* Sidebar */}
      {showSidebar && <UserSidebar/>}

      {/* Content area with conditional left margin */}
      <div className={`flex flex-col flex-grow w-full ${showSidebar ? "ml-64" : ""}`}>
        <Header setSearchQuery={setSearchQuery} user={user} isLoggedIn={isLoggedIn} onCreatePost={handleCreatePost}/>
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet context={{ searchQuery }}/>
        </main>

        <Footer />
      </div>

      <AuthModal 
          onClose={onModalClose} 
          isOpen={isModalOpen} 
          setIsOpen={setIsModalOpen} 
          isLoggedIn={isLoggedIn}/>
    </div>
  );
};

export default Layout;
