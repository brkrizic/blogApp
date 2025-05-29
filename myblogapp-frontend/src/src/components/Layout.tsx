import Header from "./base/Header.tsx";
import Footer from "./base/Footer.tsx";
import { Outlet, useLocation } from "react-router-dom";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import UserSidebar from "./base/UserSidebar.tsx";
import AuthModal from "./modals/AuthModal.tsx";

type LayoutProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Layout = ({ isModalOpen, setIsModalOpen }: LayoutProps) => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith("/account");

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      {/* Sidebar */}
      {showSidebar && <UserSidebar/>}

      {/* Content area with conditional left margin */}
      <div className={`flex flex-col flex-grow w-full ${showSidebar ? "ml-64" : ""}`}>
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>

        <Footer />
      </div>

      <AuthModal onClose={onModalClose} isOpen={isModalOpen}/>
    </div>
  );
};

export default Layout;
