import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { registerUser, loginUser, getProfile, updateProfile } from "../config/api";

import { UserContext } from "../App";

export default function SignupScreen() {
  const navigation = useNavigation();
  const { setUser, setToken } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
  if (!username || !email || !password) {
    setMessage("Please input values in each box");
    return;
  }

  const result = await registerUser(username, email, password);

  if (result.success) {
    setMessage("Signup successful ");
    navigation.replace("Login");   
  } else {
    setMessage(result.message || "User already exists");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 30, marginBottom: 20 },
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
