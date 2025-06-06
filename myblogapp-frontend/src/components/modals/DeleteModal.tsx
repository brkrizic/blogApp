import React, { useEffect } from "react";
import { modalRoot } from "../../constants/constants";
import ReactDom from "react-dom";

type DeleteModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  selectedPost: number | undefined;
  handleDelete: (postId: number) => void;
  onClose?: () => void; // optional: to close the modal
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  description,
  selectedPost,
  isOpen,
  handleDelete,
  onClose,
}) => {

  if(!isOpen) return null;
  if(!modalRoot) return null;
  if(!selectedPost) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4 text-gray-600">{description}</p>

        <div className="flex justify-end gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
          {selectedPost !== undefined && (
            <button 
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition" 
                    onClick={() => handleDelete(selectedPost)}>
              Confirm Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDom.createPortal(modalContent, modalRoot);
  
};

export default DeleteModal;
