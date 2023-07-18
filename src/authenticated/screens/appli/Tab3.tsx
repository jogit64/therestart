// Tab3.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Image,
  ImageBackground,
} from "react-native";
import LottieView from "lottie-react-native";

import rondBleuAnimation from "./../../../../assets/animations/rondbleu.json";
import rondVertAnimation from "./../../../../assets/animations/rondvert.json";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "../../../../utils/navigationTypes";

import { TabBar, TabView } from "react-native-tab-view";

export default function Tab2() {
  //const navigation = useNavigation();
  const navigation = useNavigation<StackNavigationProp<TabParamList, "Tab2">>();

  //const firstName = "utilisateur"; // Utilisez le prénom de l'utilisateur ici

  return (
    <View style={styles.container}>
      <View style={styles.seedContainer}>
        <Image
          source={require("./../../../../assets/images/logoReStart.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={styles.title}>Désherbage !</Text>
        {/* <Text style={styles.title}>de joie !</Text> */}
      </View>

      <ImageBackground
        source={require("./../../../../assets/images/fronton.png")}
        style={styles.frontonImage}
        resizeMode="cover"
      >
        <Text style={styles.textIntro}>Voici outils blabla..</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    //alignItems: "center",
    padding: 20,
    marginTop: 25,
    backgroundColor: "white",
  },

  lottieButton: {
    //width: "100%",
    //height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    position: "absolute",
    width: 250,
    height: 250,
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  // text: {
  //   fontSize: 18,
  //   fontFamily: "roboto",
  //   color: "#ffffff",
  // },
  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    // marginBottom: 20,
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },
  sstitle: {
    fontFamily: "roboto500",
    fontSize: 16,
    textAlign: "left",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
    marginTop: 10,
    marginBottom: 5,
  },
  textTab: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    // width: 300,
    // height: 60,
    //textAlign: "center",
    lineHeight: 25,
    // marginTop: 15,
    //paddingHorizontal: 10,
    fontSize: 16,
    textAlign: "left",
  },
  // textIntro: {
  //   fontFamily: "roboto",
  //   //color: "rgba(151,155,180,1)",
  //   color: "rgba(50,56,106,1)",
  //   textAlign: "center",
  //   lineHeight: 20,
  //   fontSize: 14,
  //   marginVertical: 5,
  // },

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center", // Pour le centrage vertical
    alignItems: "center", // Pour le centrage horizontal
    marginBottom: 20,
  },

  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    // width: 300,
    // height: 60,
    //textAlign: "center",
    lineHeight: 25,
    // marginTop: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  textPar: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    //textAlign: "center",
    lineHeight: 20,
    fontSize: 14,
    marginVertical: 10,
  },

  seedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",

    //marginTop: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  interblocContainer: {
    marginBottom: 65,
    marginTop: 25,
  },
  blocContainer: {
    //backgroundColor: "#c3d9e4", // utilisation de l'une des couleurs de votre palette
    marginBottom: 35,
    paddingBottom: 50,
    paddingTop: 20,
    borderRadius: 10, // arrondit les coins du bloc
    // shadowColor: "#000", // définit la couleur de l'ombre
    // shadowOffset: { width: 0, height: 2 }, // décale l'ombre horizontalement et verticalement
    // shadowOpacity: 0.2, // contrôle la transparence de l'ombre
    // shadowRadius: 2, // contrôle la flou de l'ombre
    // elevation: 5, // ajoute une ombre pour Android
    padding: 15, // ajoute une marge interne pour donner un peu d'espace au contenu
  },

  tabBar: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    borderRadius: 50,
    //backgroundColor: "#c3d9e4",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  // tabLabelActive: {
  //   color: "#000", // couleur du titre de l'onglet actif
  //   fontSize: 16, // taille de la police
  //   //backgroundColor: "#c5c7e0", // couleur de fond de l'onglet actif
  // },
  // tabLabelInactive: {
  //   color: "#000", // couleur du titre de l'onglet inactif
  //   fontSize: 16, // taille de la police
  //   //backgroundColor: "#fff", // couleur de fond de l'onglet inactif
  // },
  // tabLabel: {
  //   fontFamily: "roboto500",
  //   fontSize: 20,
  //   textAlign: "center",
  //   //marginBottom: 10,
  //   color: "rgba(50,56,106,1)",
  // },

  activeTabTitle: {
    fontFamily: "roboto500",
    fontSize: 14,
    textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
  },
  inactiveTabTitle: {
    color: "rgba(151,155,180,1)",
    fontFamily: "roboto500",
    fontSize: 14,
    textAlign: "center",
    //marginBottom: 10,
  },
  listItem: {
    flexDirection: "row", // Place le bullet et le texte côte à côte
    marginBottom: 10, // Ajoute un espace entre chaque élément de la liste
  },
  bullet: {
    width: 25, // Donne de l'espace pour le bullet
    marginLeft: 10,
  },
});
