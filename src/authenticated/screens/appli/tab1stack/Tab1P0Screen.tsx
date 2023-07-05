import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext, {
  UserContextInterface,
} from "../../../../../utils/UserContext";

import { useNavigation } from "@react-navigation/native";
import Tab1Styles from "./../../../styles/Tab1Styles";

import { StackNavigationProp } from "@react-navigation/stack";
import { Tab1ParamList } from "../../../../../utils/navigationTypes";
import { RootStackParamList } from "../../../../../utils/navigationTypes";

import Icon from "react-native-vector-icons/Entypo";

import { useHardwareBackButton } from "components/useHardwareBackButton";

type CombinedParamList = Tab1ParamList & RootStackParamList;

// * ---------------------- FONCTIONS --------------------

// Components rendus séparément
const UserGreeting = ({ firstName }) => (
  <View style={styles.bonjour1Stack}>
    <Text style={styles.bonjour1}>Bonjour,</Text>
    <Text style={styles.souda}>{firstName}!</Text>
  </View>
);

const SettingsButton = ({ onPress }) => (
  <TouchableOpacity style={styles.buttonSettings} onPress={onPress}>
    <View style={styles.ellipseFondIconStack}>
      <Svg viewBox="0 0 28.77 29.34" style={styles.ellipseFondIcon}>
        <Ellipse
          stroke="rgba(230, 230, 230,1)"
          strokeWidth={0}
          fill="rgba(255,255,255,1)"
          cx={14}
          cy={15}
          rx={14}
          ry={15}
        />
      </Svg>
      <Icon name="cog" style={styles.iconCog} />
    </View>
  </TouchableOpacity>
);

const UserImage = ({ imageUrl, defaultImage }) => (
  <Image
    source={imageUrl ? { uri: imageUrl } : defaultImage}
    resizeMode="contain"
    style={{ ...styles.photoProfil, zIndex: 3, position: "absolute" }}
  />
);

// * ----------------------MES FONCTIONS TEST --------------------------
// function HelloWorld() {
//   return (
//     <View>
//       <Text>Hello, world!</Text>
//     </View>
//   );
// }

function Badges() {
  const badges = [
    { title: "Hello", subtitle: "Subtitle 1" },
    { title: "World", subtitle: "Subtitle 2" },
    { title: "World", subtitle: "Subtitle 3" },
    { title: "World", subtitle: "Subtitle 4" },
    { title: "World", subtitle: "Subtitle 5" },
    // Ajouter autant de badges que vous voulez
  ];

  return (
    <View style={styles.badgesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {badges.map((badge, index) => (
          <View key={index} style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{badge.title}</Text>
            <Text style={styles.badgeSubtitle}>{badge.subtitle}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// * ------------------------- COMPOSANT PRINCIPAL --------------------

function Tab1() {
  useHardwareBackButton();
  const navigation = useNavigation<StackNavigationProp<CombinedParamList>>();

  const userContext = useContext<UserContextInterface | null>(UserContext);
  // Image par défaut
  const defaultImage = require("assets/images/userHead.png");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userContext !== null) {
      console.log("Le Usercontext changed:", userContext);
      console.log("Le First name:", userContext.user.basicInfo.firstName);
      setIsLoading(false);
    }
  }, [userContext]);

  // if (isLoading) {
  //   return <Text>Loading...</Text>; // Ou un autre indicateur de chargement
  // }

  if (userContext) {
    const { user } = userContext;
    const { basicInfo } = user;
    const { firstName } = basicInfo;

    // * ------------------- RENDU ---------------------------

    return (
      <View style={styles.container}>
        {/* Partie haute */}
        <View style={styles.header}>
          {/* <ImageBackground
          style={styles.fondHaut}
          imageStyle={styles.fondHaut_imageStyle}
          source={require("assets/images/Gradient_zagbeIB.png")}
        > */}
          <View style={styles.bonjour1StackRow}>
            <UserGreeting firstName={firstName} />
            <SettingsButton onPress={() => navigation.navigate("Settings")} />
          </View>
          <ImageBackground
            style={{
              ...styles.rondUsercontour1,
              zIndex: 1,
              position: "absolute",
            }}
            imageStyle={styles.rondUsercontour1_imageStyle}
            source={require("assets/images/Gradient_jOL2tsn.png")}
          />
          <ImageBackground
            style={{
              ...styles.rondUsercontour,
              zIndex: 2,
              position: "absolute",
            }}
            imageStyle={styles.rondUsercontour_imageStyle}
            source={require("assets/images/Gradient_jOL2tsn.png")}
          />
          <UserImage
            imageUrl={userContext.imageUrl}
            defaultImage={defaultImage}
          />
          {/* </ImageBackground> */}
        </View>

        {/* Partie basse */}
        <View style={styles.lowerSection}>
          {/* Contenu de la partie basse */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Tab1P1")}
          >
            <Text style={styles.buttonText}>Go to Tab1P1</Text>
          </TouchableOpacity>
          <Badges />
        </View>
      </View>
    );
  }

  return null; // ou vous pouvez renvoyer un autre élément en cas d'erreur
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "column",
    justifyContent: "space-around",
  },

  lowerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Marge haute pour l'espacement si nécessaire
  },
  fondHaut: {
    width: 360,
    height: 203,
    borderRadius: 52,
    shadowColor: "grey",
    shadowOffset: {
      height: 7,
      width: 0,
    },
    elevation: 7,
    shadowOpacity: 1,
    shadowRadius: 11,
    borderBottomRightRadius: 57,
    borderBottomLeftRadius: 57,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    //marginTop: 23,
    alignSelf: "center",
    overflow: "hidden",
  },
  fondHaut_imageStyle: {},
  bonjour1: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
  },
  souda: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    marginLeft: 4, // Créer de l'espace entre les Text
  },
  bonjour1Stack: {
    flexDirection: "row", // Placer les Text côte à côte
    alignItems: "center", // Centrer verticalement
    alignSelf: "flex-end",
  },
  buttonSettings: {
    position: "absolute", // Positionner l'icône indépendamment
    right: 10, // Créer de l'espace à droite
    top: 10, // Créer de l'espace en haut
    width: 29,
    height: 29,
  },
  ellipseFondIcon: {
    top: 0,
    width: 29,
    height: 29,
    position: "absolute",
    left: 0,
  },
  iconCog: {
    top: 2,
    left: 2,
    position: "absolute",
    color: "rgba(111,120,189,1)",
    fontSize: 24,
  },
  ellipseFondIconStack: {
    width: 29,
    height: 29,
  },
  bonjour1StackRow: {
    height: 29,
    flexDirection: "row",
    justifyContent: "center", // Centrer horizontalement
    marginTop: 37,
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
    marginTop: 79,
    marginLeft: 124,
    opacity: 0.25,
  },
  rondUsercontour1_imageStyle: {},
  rondUsercontour: {
    width: 95,
    height: 90,
    borderRadius: 100,
    shadowColor: "rgba(220,225,244,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 54,
    shadowOpacity: 1,
    shadowRadius: 8,
    overflow: "hidden",
    marginTop: 86,
    marginLeft: 133,
    opacity: 0.5,
  },
  rondUsercontour_imageStyle: {},
  photoProfil: {
    width: 81,
    height: 81,
    marginTop: 90,
    marginLeft: 140,
    borderRadius: 50,
  },

  // button: {
  //   backgroundColor: "#6f78bd",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   color: "white",
  //   fontSize: 16,
  // },
  buttonContainer: {
    //position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 120,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red",
  },

  // * MES STYLES TEST -----------------

  badgeContainer: {
    backgroundColor: "#6f78bd",
    borderRadius: 5, // Plus petit pour un look plus rectangulaire
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginRight: 5,
    marginTop: 5,
    width: 80, // Ajouter une largeur spécifique pour que tous les badges aient la même taille
    height: 80,
    alignItems: "center", // Centrer le contenu horizontalement
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center", // Centrer le texte
  },
  badgeSubtitle: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center", // Centrer le texte
  },

  button: {
    backgroundColor: "#6f78bd",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center", // centrer le bouton
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  //...
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20, // donner un peu d'espace entre les badges et le bouton
    marginTop: 40,
    marginLeft: 20,
    justifyContent: "center", // centrer les badges
  },

  content: {
    flex: 1, // pour prendre le reste de l'espace
    justifyContent: "flex-start", // aligner le contenu à la fin
    //marginBottom: 20, // donner un peu d'espace en bas
    paddingTop: 50,
  },
});

export default Tab1;
