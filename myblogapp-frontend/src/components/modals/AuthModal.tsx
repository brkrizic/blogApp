import { useEffect, useState } from "react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import ReactDom from "react-dom";
import { modalRoot } from "../../constants/constants";

type AuthModalProps = {
    onClose: () => void;
    isOpen: boolean;
}

const AuthModal = ({ onClose, isOpen }: AuthModalProps) => {
    if(!isOpen) return null;

    const [mode, setMode] = useState<"login" | "register">("login");

    const toggleMode = () => {
        setMode(prev => (prev === "login" ? "register" : "login"));
    };

    if(!modalRoot) return null;

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
              <LoginForm />
              <p className="text-sm text-gray-500 mt-4">
                Don’t have an account?{" "}
                <button className="text-blue-500 underline" onClick={toggleMode}>
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm />
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