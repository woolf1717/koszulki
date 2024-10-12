export const stripFileNameFromExtension = (fileName: string) => {
  return fileName.split(".")[0];
};

export const resizeImageFile = (
  file: File,
  maxWidth: number = 64,
  maxHeight: number = 64
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return reject(new Error("Failed to get canvas context"));
      }

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          // Extract the file name without extension
          const baseName = file.name.split(".").slice(0, -1).join(".");
          // Extract the file extension
          const extension = file.name.split(".").pop();
          // Create a new file name with "_thumbnail" appended
          const newFileName = `${baseName}_thumb.${extension}`;
          const resizedFile = new File([blob], newFileName, {
            type: file.type,
          });
          resolve(resizedFile);
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, file.type);
    };

    img.onerror = (error) => reject(error);

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};
