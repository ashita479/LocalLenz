import axios from "axios";

export const BASE_URL = "https://locallensbackend.onrender.com/api";

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { username, email, password });
    console.log("Register Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Register Error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};


export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};


export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Get Profile Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Get Profile Error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const updateProfile = async (token, imageUri, name, bio) => {
  try {
    const formData = new FormData();

    if (imageUri) {
      formData.append("file", {
        uri: imageUri,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }

    formData.append("name", name);
    formData.append("bio", bio);

    const response = await axios.put(
      `${BASE_URL}/user/profilePicture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Get All Users Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Get All Users Error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const getUserById = async (token, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Get User By ID Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Get User By ID Error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};
