import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import Swiper from "react-native-swiper";

// * imports pour le bas
import MaterialButtonViolet1 from "./accueil/bottompart/MaterialButtonViolet1";
import MaterialButtonViolet3 from "./accueil/bottompart/MaterialButtonViolet3";

// * imports pour le haut
import Swiper1 from "./accueil/swiper1/swiper1";
import Swiper2 from "./accueil/swiper2/swiper2";
import Swiper3 from "./accueil/swiper3/swiper3";

export default function HomeScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* 2/3 of the screen *********************************************************/}

      <View style={{ flex: 3 }}>
        <Swiper
          showsButtons={false}
          showsPagination={true}
          dotColor="#dcdeeb"
          activeDotColor="#6f78bd"
          loop={false}
        >
          {/* Each child view of Swiper represents a page */}
          {/*  // ! *********** swiper volet 1 ********** */}
          <LinearGradient
            //
            colors={["yellow", "#f8fcff"]}
            colors={["#e9f6ff", "#f8fcff"]}
            style={styles.page}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            key="1"
          >
            <Swiper1 />
          </LinearGradient>
          {/*  // ! *********** swiper volet 2 ********** */}
          <LinearGradient
            //colors={["yellow", "#f8fcff"]}
            colors={["#e9f6ff", "#f8fcff"]}
            style={styles.page}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            key="2"
          >
            <Swiper2 />
          </LinearGradient>

          {/*  // ! *********** swiper volet 3 ********** */}
          <LinearGradient
            //colors={["yellow", "#f8fcff"]}
            colors={["#e9f6ff", "#f8fcff"]}
            style={styles.page}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            key="3"
          >
            <Swiper3 />
          </LinearGradient>
        </Swiper>
      </View>

      {/* 1/3 of the screen *********************************************************/}

      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(111,120,189,1)"
        />

        <MaterialButtonViolet1
          style={styles.materialButtonViolet1}
          onPress={() => navigation.navigate("SignUp")}
        ></MaterialButtonViolet1>
        <MaterialButtonViolet3
          style={styles.materialButtonViolet3}
          onPress={() => navigation.navigate("Login")}
        ></MaterialButtonViolet3>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //* Style du conteneur général ------------------------------------------
  container: {
    flex: 1,
  },

  //* Style du haut slide 2/3 -------------------------------------
  // ! cf. chaque swiper

  //* Style du bas fixe 1/3 ---------------------------------------
  materialButtonViolet1: {
    height: 55,
    width: 312,
    backgroundColor: "rgba(111,120,189,1)",
    borderRadius: 11,
    marginTop: 5,
    alignSelf: "center",
  },
  materialButtonViolet3: {
    height: 55,
    width: 312,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 11,
    marginTop: 21,
    alignSelf: "center",
  },

  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: "100%",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pageContent: {
    fontSize: 16,
    marginTop: 10,
  },
});
