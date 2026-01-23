import { conf } from "../conf/conf";

async function uploadImageToCloudinary(data) {
    const cloudName = conf.cloudName;
    const uploadPreset = conf.uploadPreset;
  
    const formData = new FormData();
    formData.append("file", data);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const result = await response.json();
      console.log("Upload success:", result);
  
      return result.url; 
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }
  
export default uploadImageToCloudinary;