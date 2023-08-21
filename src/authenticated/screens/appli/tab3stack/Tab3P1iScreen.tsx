// Tab3.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tab3ParamList } from "../../../../../utils/navigationTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import AppIntroSlider from "react-native-app-intro-slider";
import { ScrollView } from "react-native-gesture-handler";

export default function Tab3P1i() {
  const navigation =
    useNavigation<StackNavigationProp<Tab3ParamList, "Tab3P0">>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.firstPartContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Tab3P0")}>
            <View style={styles.backButtonContainer}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#000"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.titleScreen}>Observation détachée</Text>
        </View>

        <View style={styles.secondPartContainer}>
          <View style={styles.sssecondPartContainer}>
            <Text style={styles.sstitle}>
              Consignes :<View style={{ width: 5 }} />
              <Text style={styles.textIntro}>
                Sélectionnez (max. 3) les composants principaux de votre pensée
                perturbatrice parmi les libellés suivants et cliquez sur
                "Afficher les propositions".
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.thirdPartContainer}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    //paddingHorizontal: 20,
    paddingTop: 50,
  },

  firstPartContainer: {
    flex: 1,
    flexDirection: "row", // Ajoutez cette ligne
    alignItems: "center", // Centrez les éléments verticalement
    paddingHorizontal: 20,
  },

  titleScreen: {
    fontFamily: "roboto700",
    fontSize: 22,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
    //  marginBottom: 15,
  },

  backButtonContainer: {
    width: 40, // Taille du cercle
    height: 40,
    borderRadius: 20, // Arrondi pour rendre le cercle parfait
    backgroundColor: "#f5f6fa",
    justifyContent: "center", // Centrez l'icône horizontalement
    alignItems: "center", // Centrez l'icône verticalement
    marginRight: 15, // Espace entre le bouton et le texte
  },

  secondPartContainer: {
    flex: 1,
    // justifyContent: "flex-start",
    //backgroundColor: "white",
    //paddingHorizontal: 20,
    //paddingTop: 50,
    paddingHorizontal: 20,
    //marginTop: 10,
    marginBottom: 20,
  },

  sssecondPartContainer: {
    flexDirection: "row",
    marginTop: 15,
    //paddingHorizontal: 20,
  },

  sstitle: {
    fontFamily: "roboto500",
    fontSize: 16,
    //textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
    // marginTop: 20,
    // marginBottom: 5,
  },

  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    //paddingHorizontal: 10,
    fontSize: 16,
    marginLeft: 10,
  },

  thirdPartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    //marginTop: 10,
    marginBottom: 30,
  },

  containerList: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },

  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },

  // visiteBtnContainer: {
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  // },

  // button: {
  //   backgroundColor: "#20c2cd",
  //   padding: 10,
  //   paddingLeft: 20,
  //   justifyContent: "center",
  //   //alignSelf: "center",
  //   ///alignItems: "center",
  //   //marginBottom: 20,
  //   //marginVertical: 20,
  //   marginTop: 15,
  //   borderRadius: 15,
  //   width: "100%",
  //   height: 80,
  // },
  // buttonText: {
  //   color: "green",
  //   fontSize: 15,
  //   marginLeft: 22,
  //   lineHeight: 22,
  //   //backgroundColor: "#6f78bd",
  // },
  // slide: {
  //   flex: 1,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   padding: 20,
  // },
  // titleBoard: {
  //   fontFamily: "roboto700",
  //   fontSize: 24,
  //   textAlign: "center",
  //   color: "rgba(50,56,106,1)",
  //   paddingLeft: 10,
  //   marginVertical: 25,
  // },
  // textBoard: {
  //   fontFamily: "roboto",
  //   color: "rgba(151,155,180,1)",
  //   lineHeight: 25,
  //   paddingHorizontal: 10,
  //   fontSize: 16,
  // },

  // doneButton: {
  //   backgroundColor: "#008CBA",
  //   padding: 10,
  //   position: "absolute", // new
  //   bottom: 50, // new
  //   alignSelf: "center", // new
  //   alignItems: "center",
  // },

  buttonCircle: {
    width: 90,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  // buttonText: {
  //   color: "white",
  // },
  itemContainer: {
    width: "100%",
    height: 80,
    padding: 10,
    //margin: 10,
    marginTop: 10,
    justifyContent: "center",
    //borderWidth: 1,
    // borderColor: "#f2f7fb",

    //backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 15,
  },
  itemText: {
    fontFamily: "roboto",
    //color: "rgba(151,155,180,1)",
    //backgroundColor: "rgba(0, 0, 0, .2)",
    color: "rgba(50,56,106,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  lancerBtnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //  borderColor: "#f6e482", // Ajout d'une couleur de bordure
    //borderWidth: 2, // Largeur de la bordure
    borderRadius: 10, // Arrondissement de la bordure
  },

  lancerBtn: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "black",
    //marginTop: 25,
    //marginBottom: 5,
    // justifyContent: "center",
    // alignItems: "center",
    //alignSelf: "center",
    paddingVertical: 15,
  },
});
