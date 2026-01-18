import React, { useState, useContext } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Image,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../App";
import { updateProfile } from "../config/api";

export default function EditProfileScreen({ navigation }) {
  const { user, setUser, token } = useContext(UserContext);

  const [bio, setBio] = useState(user.bio || "");
  const [pronouns, setPronouns] = useState(user.pronouns || "");
  const [imageUri, setImageUri] = useState(user.imageUri);
  const [message, setMessage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const handleSave = async () => {
    let updatedImageUri = user.imageUri;

    
    if (imageUri && imageUri !== user.imageUri) {
      const result = await updateProfile(token, imageUri);

      if (!result.success) {
        setMessage("Profile picture update failed");
        return;
      }

      updatedImageUri = result.user.profilePicture;
    }

    
    setUser((prev) => ({
      ...prev,
      imageUri: updatedImageUri,
      bio,
      pronouns,
    }));

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            imageUri ? { uri: imageUri } : require("../assets/avatar.jpg")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />

      <TextInput
        style={styles.input}
        placeholder="Pronouns"
        value={pronouns}
        onChangeText={setPronouns}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#9066df",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18 },
  message: { color: "red", marginBottom: 10 },
});
