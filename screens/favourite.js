import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

export default function FavouriteScreen({ data, favourites }) {
  const favouriteEvents = data.filter((item) => favourites.includes(item.id));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favouriteEvents.length > 0 ? (
        favouriteEvents.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>Event Name: {item.title}</Text>
            <Text>Event Date: {item.date}</Text>
            <Text>Event Location: {item.location}</Text>
            <Text>Event Description: {item.description}</Text>
            <Text>Event Contact: {item.contact}</Text>
          </View>
        ))
      ) : (
        <Text>No favourites yet!</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#9066df",
    color: "#fff",
    padding: 5,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
});
