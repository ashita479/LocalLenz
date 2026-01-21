import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_URL_BASE;
 

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { username, email, password });
    console.log(" Post register response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Post register error:", error.response?.data || error.message);
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
    console.log("Get profile response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Get profile error:", error.response?.data || error.message);
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
    console.log("Get all users response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Get all users error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const getUserById = async (token, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Get user by ID response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Get user by ID error:", error.response?.data|| error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};
