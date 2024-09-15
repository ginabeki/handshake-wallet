import { useState, ChangeEvent } from "react";

interface UseImageUploaderResult {
  picture: string | null;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const useImageUploader = (): UseImageUploaderResult => {
  const [picture, setPicture] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputField = event.target;
    const files = inputField.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileSize = file.size / 1024;

      if (fileSize > 700) {
        inputField.value = "";
        alert("Please select an image with a size less than 700KB.");
      } else {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const imageDataUrl = e.target?.result as string;
          setPicture(imageDataUrl);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return {
    picture,
    handleImageChange,
  };
};

export default useImageUploader;