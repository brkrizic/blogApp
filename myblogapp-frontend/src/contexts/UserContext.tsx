import { createContext, useContext, useState, type ReactNode } from "react";
import { dummyUser } from "../data/dummyUser";

// Define the shape of the user object
type User = {
  id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
  posts: number;
  comments: number;
  users: number;
};

// Context type now includes both user and setUser
type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(dummyUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
