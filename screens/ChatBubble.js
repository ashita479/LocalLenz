import React from "react";
import { View, Text } from "react-native";

export default function ChatBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <View
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        backgroundColor: isUser ? "#4CAF50" : "#E0E0E0",
        padding: 10,
        borderRadius: 10,
        marginVertical: 4,
        maxWidth: "80%",
      }}
    >
      <Text style={{ color: isUser ? "white" : "black" }}>
        {text}
      </Text>
    </View>
  );
}

