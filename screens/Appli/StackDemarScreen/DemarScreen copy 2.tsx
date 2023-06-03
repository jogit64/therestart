import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { auth } from "../../../firebase.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/FontAwesome";
import UserContext from "../../../UserContext.js"; // Import du UserContext

const DemarScreen = () => {
  const { firstName } = useContext(UserContext); // Utilisation du UserContext pour accéder au prénom de l'utilisateur

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#acc8f7", "#ddcde8"]}
        style={styles.rect}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.greeting}>Bonjour, {firstName}</Text>
        <BlurView intensity={50} style={styles.absolute}>
          <LinearGradient
            colors={["#acc8f7", "#ddcde8"]}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <View style={styles.circle}>
              <Icon name="user" style={styles.icon} />
            </View>
          </LinearGradient>
        </BlurView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rect: {
    width: 360,
    height: 252,
    borderRadius: 52,
    shadowColor: "rgba(220,221,239,1)",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 1,
    shadowRadius: 20,
    borderBottomRightRadius: 57,
    borderBottomLeftRadius: 57,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  gradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "rgba(220,222,235,1)",
    fontSize: 40,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default DemarScreen;
