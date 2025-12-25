import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/screens/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const colorScheme = useColorScheme();

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

 
  const statusBarStyle = showSplash
    ? "light"
    : colorScheme === "dark"
    ? "light"
    : "dark";

  return (
    <>
      <StatusBar style={statusBarStyle} />
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      )}
    </>
  );
}
