import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import * as Speech from "expo-speech";
const API_K = process.env.API_KEY;


const WebScreen = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      role: "user",
      parts: [{ text: userInput }],
    };

    const updatedChat = [...chat, userMessage];
    setChat(updatedChat);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_K}`,
        {
          contents: updatedChat,
        }
      );

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (modelResponse) {
        const botMessage = {
          role: "model",
          parts: [{ text: modelResponse }],
        };

        setChat([...updatedChat, botMessage]);

        Speech.speak(modelResponse, {
          onStart: () => setIsSpeaking(true),
          onDone: () => setIsSpeaking(false),
        });
      }
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chat}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ChatBubble role={item.role} text={item.parts[0].text} />
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      {loading && <ActivityIndicator size="small" color="#007AFF" />}

      <View style={styles.inputContainer}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={handleUserInput}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>

      {isSpeaking && (
        <TouchableOpacity onPress={stopSpeaking} style={styles.stopBtn}>
          <Text style={{ color: "white" }}>Stop Speaking</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WebScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
  stopBtn: {
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
  },
});
