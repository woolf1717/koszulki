import { createDecal } from "../api";

import { useContext, useState } from "react";
import { ThemeContext } from "./themeContext";

export const InputHandler = ({ setSnap }: { setSnap: (snap: any) => void }) => {
  const { theme } = useContext(ThemeContext);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    // if (file.type !== "image/png" && file.type !== "image/jpeg") {
    //   alert("Please select a PNG or JPEG image file.");
    //   return;
    // }

    // if (file.size > 1024 * 1024) {
    //   alert("File size should not exceed 1MB.");
    //   return;
    // }
  };

  const handleUploadNewDesign = async (file: File) => {
    if (!file) {
      return alert("Please select a file");
    } else {
      await createDecal(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        className="bg-yellow-500 m-4"
        onClick={() => file && handleUploadNewDesign(file)}
        style={{ background: theme }}
      >
        UPLOAD DESIGN
      </button>
    </div>
  );
};
