import { createDecal, uploadImageToStorage } from "../api";

import { useState } from "react";

export const InputHandler = ({ setSnap }: { setSnap: (snap: any) => void }) => {
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
    console.log("handleUplowaNewDesign");
    if (!file) {
      return alert("Please select a file");
    } else {
      await createDecal(file);
      console.log(file);
      console.log("upload to state");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div
        className="bg-yellow-500"
        onClick={() => file && handleUploadNewDesign(file)}
      >
        UPLOAD DESIGN
      </div>
    </div>
  );
};
