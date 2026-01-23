async function uploadImageToCloudinary(data) {
    const cloudName = "dpdvsyzlq";
    const uploadPreset = "container";
  
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
  
      const result = response.url;
      console.log("Upload success:", result);
  
      return result; // contains public_id, secure_url, etc.
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }
  
export default uploadImageToCloudinary;