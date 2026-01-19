import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { registerUser, loginUser, getProfile, updateProfile } from "../config/api";

import { UserContext } from "../App";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUser, setToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      setToken(result.token);

      const profile = await getProfile(result.token);
      if (profile.success) 
        setUser(profile.user);
        


      navigation.replace("MainTabs");
    } else {
      setMessage(result.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.linkText}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff" 
  },
  title: { 
    fontSize: 30, 
    marginBottom: 20 
  },
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
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  message: {
    color: "red", 
    marginBottom: 10
  },
  linkText: { 
    marginTop: 10, 
    color: "blue", 
    textDecorationLine: "underline" 
  },
});
