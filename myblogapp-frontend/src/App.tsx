import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import { useState } from "react"
import AboutPage from "./pages/AboutPage";
import PostsPage from "./pages/PostsPage";
import PostDetails from "./pages/PostDetails";
import AccountPage from "./pages/AccountPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import MyPostsPage from "./pages/dashboard/MyPostsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import { CreateEditPost } from "./pages/dashboard/CreateEditPost";
import UserProfilePage from "./pages/UserProfilePage";


function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Routes>
      <Route element={<Layout 
                        isModalOpen={isOpen} 
                        setIsModalOpen={setIsOpen}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                      />}>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/posts" element={<PostsPage />}/>
        <Route path="/:id" element={<PostDetails />}/>
        <Route path="/account" element={<AccountPage />}/>
        <Route path="/account/dashboard" element={<DashboardPage/>}/> 
        <Route path="/account/profile" element={<ProfilePage/>}/>
        <Route path="/account/myposts" element={<MyPostsPage/>}/>
        <Route path="/account/myposts/createEditPost/:id" element={<CreateEditPost />}/>
        <Route path="/account/myposts/createEditPost" element={<CreateEditPost />}/>
        <Route path="/account/settings" element={<SettingsPage/>}/>
        <Route path="/userProfile" element={<UserProfilePage />}/>
      </Route>
    </Routes>
  )
}

export default App
