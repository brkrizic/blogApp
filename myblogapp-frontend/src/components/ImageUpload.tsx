import React, { useState, useEffect } from "react";

type ImageUploadProps = {
  label?: string;
  existingImageUrl?: string;
  onImageChange: (file: File | null) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  label = "Upload Image",
  existingImageUrl,
  onImageChange,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (existingImageUrl) {
      setPreviewUrl(existingImageUrl);
    } else {
      setPreviewUrl("http://localhost:8080/images/placeholder.png");
    }
  }, [file, existingImageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onImageChange(selectedFile);
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl("http://localhost:8080/images/placeholder.png");
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block font-medium">{label}</label>}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {previewUrl && (
        <div className="relative mt-2">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded"
          />
          {previewUrl != "http://localhost:8080/images/placeholder.png" && (
            <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 px-2 rounded-full"
            >
                &times;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
