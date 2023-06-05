import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import Svg, { Ellipse } from "react-native-svg";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../../firebase.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/FontAwesome";
import UserContext from "../../UserContext.tsx"; // Import du UserContext
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
const Stack = createStackNavigator();
import SettingsScreen from "./StackDemarTab/SettingsScreen";

function DemarTabContent() {
  const navigation = useNavigation();
  const { firstName } = useContext(UserContext); // Utilisation du UserContext pour accéder au prénom de l'utilisateur
  //const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        // style={styles.rect1}
        imageStyle={styles.rect1_imageStyle}
        source={require("../../assets/images/fondBonjourFirst.png")}
      >
        <View style={styles.bonjour1StackRow}>
          <View style={styles.bonjour1Stack}>
            <Text style={styles.bonjour1}>Bonjour,</Text>
            <Text style={styles.firstname}>{firstName}!</Text>
          </View>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={styles.ellipseFondIcon1Stack}>
              <Svg viewBox="0 0 28.77 29.34" style={styles.ellipseFondIcon1}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(255,255,255,1)"
                  cx={14}
                  cy={15}
                  rx={14}
                  ry={15}
                ></Ellipse>
              </Svg>
              <MaterialCommunityIconsIcon
                name="cog"
                style={styles.iconSettings1}
              ></MaterialCommunityIconsIcon>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.groupUser2group}>
          <View style={styles.groupUserFon2Ronds}>
            <ImageBackground
              style={styles.rondUsercontour1}
              imageStyle={styles.rondUsercontour1_imageStyle}
              source={require("../../assets/images/Gradient_jOL2tsn.png")}
            >
              <ImageBackground
                style={styles.rondUsercontour}
                imageStyle={styles.rondUsercontour_imageStyle}
                source={require("../../assets/images/Gradient_jOL2tsn.png")}
              >
                <View style={styles.groupUserElilipse}>
                  <View style={styles.ellipseUserStack}>
                    <Svg viewBox="0 0 67.27 67.27" style={styles.ellipseUser}>
                      <Ellipse
                        stroke="rgba(230, 230, 230,1)"
                        strokeWidth={0}
                        fill="rgba(255,255,255,1)"
                        cx={34}
                        cy={34}
                        rx={34}
                        ry={34}
                      ></Ellipse>
                    </Svg>
                    <MaterialCommunityIconsIcon
                      name="account"
                      style={styles.iconUser}
                    ></MaterialCommunityIconsIcon>
                  </View>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default function DemarTab() {
  return (
    <Stack.Navigator initialRouteName="Demar">
      <Stack.Screen
        name="Demar"
        component={DemarTabContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },

  rect1_imageStyle: {
    height: 280,
    resizeMode: "contain",
    alignItems: "center",
  },

  bonjour1Stack: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  firstname: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginLeft: 5,
    flexShrink: 1,
  },
  bonjour1: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
  },

  ellipseFondIcon1: {
    left: 0,
    width: 29,
    height: 29,
    position: "absolute",
  },

  iconSettings1: {
    top: 3,
    left: 3,
    position: "absolute",
    color: "rgba(111,120,189,1)",
    fontSize: 22,
  },

  ellipseFondIcon1Stack: {
    width: 29,
    height: 29,
  },

  bonjour1StackRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    paddingLeft: 0,
  },

  iconContainer: {
    position: "absolute",
    right: 10,
  },

  groupUser2group: {
    width: 112,
    height: 105,
    marginTop: 30,
    marginLeft: 124,
  },

  groupUserFon2Ronds: {
    width: 112,
    height: 105,
  },

  rondUsercontour1: {
    width: 112,
    height: 105,
    borderRadius: 100,
    shadowColor: "rgba(220,225,244,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 66,
    shadowOpacity: 1,
    shadowRadius: 22,
    overflow: "hidden",
  },

  rondUsercontour1_imageStyle: {},
  rondUsercontour: {
    width: 85,
    height: 80,
    borderRadius: 100,
    shadowColor: "rgba(220,225,244,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 24,
    shadowOpacity: 1,
    shadowRadius: 8,
    overflow: "hidden",
    marginTop: 13,
    marginLeft: 13,
  },

  rondUsercontour_imageStyle: {},
  groupUserElilipse: {
    width: 67,
    height: 67,
    marginTop: 6,
    marginLeft: 9,

    elevation: 160,
    shadowOpacity: 1,
    shadowRadius: 20,
    overflow: "hidden",
  },

  ellipseUser: {
    top: 0,
    left: 0,
    width: 67,
    height: 67,
    position: "absolute",
  },

  iconUser: {
    top: 11,
    left: 14,
    position: "absolute",
    color: "rgba(220,222,235,1)",
    fontSize: 40,
  },

  ellipseUserStack: {
    width: 67,
    height: 67,
  },
});

export default DemarTab;
