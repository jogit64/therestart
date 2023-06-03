// WelcomeScreen.js

import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import UserContext from "../../../UserContext";

const WelcomeScreen = () => {
  const { firstName } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#e9f6ff", "#f8fcff"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        key="1"
      >
        <Image
          source={require("../../assets/images/go11.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>

        {firstName ? (
          <Text style={styles.text}>Bonjour, {firstName}!</Text>
        ) : (
          <Text style={styles.text}>Pas d'utilisateur connecté.</Text>
        )}
      </LinearGradient>
    </View>
  );
};

// ... Styles ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 20,
  },
  image: {
    flex: 1,
    width: "100%",
  },

  gradient: {
    flex: 1,
    width: "100%",
  },
});

export default WelcomeScreen;
