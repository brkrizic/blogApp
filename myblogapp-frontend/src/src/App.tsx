import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import { useEffect, useState } from "react"
import AboutPage from "./pages/AboutPage";
import PostsPage from "./pages/PostsPage";
import PostDetails from "./pages/PostDetails";
import AccountPage from "./pages/AccountPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import MyPostsPage from "./pages/dashboard/MyPostsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import { dummyUser } from "./data/dummyUser";
import { UserProvider } from "./contexts/UserContext";
import { CreateEditPost } from "./pages/dashboard/CreateEditPost";


function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isLoggedIn = false;

  useEffect(() => {
    if(!isLoggedIn){
      setIsOpen(true);
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route element={<Layout 
                        isModalOpen={isOpen} 
                        setIsModalOpen={setIsOpen}
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
      </Route>
    </Routes>
  )
}

export default App
