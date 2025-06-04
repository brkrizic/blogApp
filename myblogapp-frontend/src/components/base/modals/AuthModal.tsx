import { useState, type FormEvent } from "react";
import RegisterForm from "../../RegisterForm";
import ReactDom from "react-dom";
import { modalRoot } from "../../../constants/constants";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/store/authSlice";
import { registerUser } from "../../../api/userApi";
import LoginForm from "../../LoginForm";

type AuthModalProps = {
    onClose: () => void;
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    isLoggedIn: boolean | null;
}

const AuthModal = ({ onClose, isOpen, setIsOpen, isLoggedIn }: AuthModalProps) => {
    if(!isOpen) return null;
    if(isLoggedIn) return null;

    const [mode, setMode] = useState<"login" | "register">("login");
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useDispatch<any>();

    const toggleMode = () => {
        setMode(prev => (prev === "login" ? "register" : "login"));
    };

    if(!modalRoot) return null;

    const handleLogin = (e: FormEvent) => {
      e.preventDefault();
      dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        setIsOpen(false);
      })
      .catch((err: any) => {
        console.error("Login failed:", err);
      });
    }

    const handleRegister = (e: FormEvent) => {
      e.preventDefault();
      registerUser({ fullName, username, password })
      .then(() => {
        setMode("login");
      })
    }

    const modalContent = (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          {mode === "login" ? (
            <>
              <LoginForm
                  onLogin={handleLogin} 
                  setUsername={setUsername} 
                  setPassword={setPassword}
                  username={username}
                  password={password}
                  />
              <p className="text-sm text-gray-500 mt-4">
                Don’t have an account?{" "}
                <button className="text-blue-500 underline" onClick={toggleMode}>
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm 
                onRegister={handleRegister}
                fullname={fullName}
                username={username}
                password={password}
                setFullname={setFullName}
                setUsername={setUsername}
                setPassword={setPassword}
              />
              <p className="text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <button className="text-blue-500 underline" onClick={toggleMode}>
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
  );

  return ReactDom.createPortal(modalContent, modalRoot);

};
export default AuthModal;