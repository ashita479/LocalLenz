
import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../App";

export default function ProfileScreen({ navigation }) {
  const { user } = useContext(UserContext);





  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={
            user.imageUri ? { uri: user.imageUri } : require("../assets/avatar.jpg")
          }
          style={styles.avatar}
        />

        <View style={styles.infoColumn}>
          <Text style={styles.name}>{user.username}</Text>
          {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{user.email}</Text>
        </Text>

        {user.pronouns ? (
          <Text style={styles.label}>
            Pronouns: <Text style={styles.value}>{user.pronouns}</Text>
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>


    </View>


  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  topRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 30 
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginRight: 20 
  },
  infoColumn: { 
    flex: 1 
  },
  name: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 5 
  },
  bio: { 
    fontSize: 16, 
    color: "#555" 
  },
  details: { 
    marginBottom: 30 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 10, 
    fontWeight: "600", 
    color: "#333" 
  },
  value: { 
    fontWeight: "normal", 
    color: "#555" 
  },
  button: {
    backgroundColor: "#9066df",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16 
  },



});
