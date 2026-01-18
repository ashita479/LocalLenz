import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";

import EditProfile from "./screens/editprofile";
import Profile from "./screens/profile";
import HomeScreen from "./screens/home";
import FavouriteScreen from "./screens/favourite";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import { loginUser, getProfile } from "./config/api"; 

export const UserContext = createContext();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    pronouns: "",
    bio: "",
    imageUri: null,
  });

  const [token, setToken] = useState(""); 
  const [data, setData] = useState([]);
  const [favourites, setFavourites] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://68ce624a6dc3f350777ed8ae.mockapi.io/api/events";
      let result = await fetch(url);
      result = await result.json();
      setData(result);
    };
    fetchData();
  }, []);



  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Favourites") iconName = "heart-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#9066df",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            data={data}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Favourites">
        {(props) => (
          <FavouriteScreen {...props} data={data} favourites={favourites} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );

  return (
  <UserContext.Provider value={{ user, setUser, token, setToken }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </UserContext.Provider>
);

}
