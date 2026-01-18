import React from "react";

import {ScrollView,View,Text,StyleSheet,TouchableOpacity,Image,} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({ data, favourites, setFavourites }) {
  const toggle = (id) => {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((favId) => favId !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.text}> </Text>
        {data.length > 0
          ? data.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.scroll}>Event Name: {item.title}</Text>
                <TouchableOpacity onPress={() => toggle(item.id)}>
                  <Icon
                    name={favourites.includes(item.id) ? "heart" : "heart-o"}
                    size={24}
                    color={favourites.includes(item.id) ? "red" : "gray"}
                  />
                </TouchableOpacity>
                <Text>Event Date: {item.date}</Text>
                <Text>Event Location: {item.location}</Text>
                <Text>Event Time: {item.time}</Text>
                <Text>Event Description: {item.description}</Text>
                <Text>Event Contact: {item.contact}</Text>
              </View>
            ))
          : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingBottom: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
  scroll: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#9066dfff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
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
});
