export const uploadToCloudinary = async (file) => {
  const url = 'https://api.cloudinary.com/v1_1/dy7uhncny/upload'; // Sửa lại endpoint
  const preset = "ml_default"; // Thay bằng upload preset của bạn

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Upload failed");
    const data = await response.json();
    return data; // data.secure_url là link ảnh
  } catch (error) {
    throw error;
  }
};