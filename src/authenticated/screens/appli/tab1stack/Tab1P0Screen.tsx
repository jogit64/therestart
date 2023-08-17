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
//import Tab1Styles from "./../../../styles/Tab1Styles";

import { StackNavigationProp } from "@react-navigation/stack";
import { Tab1ParamList } from "../../../../../utils/navigationTypes";
import { RootStackParamList } from "../../../../../utils/navigationTypes";

import Icon from "react-native-vector-icons/Entypo";

import { useHardwareBackButton } from "components/useHardwareBackButton";

type CombinedParamList = Tab1ParamList & RootStackParamList;

// const UserImage = ({ imageUrl, defaultImage }) => (
//   console.log("imageUrl:", imageUrl),
//   console.log("defaultImage:", defaultImage),
//   (
//     <Image
//       source={
//         imageUrl
//           ? { uri: `${imageUrl}?time=${new Date().getTime()}` }
//           : defaultImage
//       }
//       resizeMode="cover"
//       style={{ ...styles.photoProfil }}
//     />
//   )
// );

// const UserImage = ({ imageUrl, defaultImage }) => {
//   console.log("imageUrl:", imageUrl);
//   console.log("defaultImage:", defaultImage);

//   return (
//     <Image
//       source={
//         imageUrl
//           ? { uri: `${imageUrl}?time=${new Date().getTime()}` }
//           : defaultImage
//       }
//       resizeMode="cover"
//       style={{ ...styles.photoProfil }}
//     />
//   );
// };

const UserImage = ({ imageUrl, defaultImage }) => (
  <Image
    source={imageUrl ? { uri: imageUrl } : defaultImage}
    resizeMode="contain"
    style={{ ...styles.photoProfil }}
  />
);

function Tab1() {
  useHardwareBackButton();
  const navigation = useNavigation<StackNavigationProp<CombinedParamList>>();
  const userContext = useContext<UserContextInterface | null>(UserContext);
  const defaultImage = require("assets/images/userHead.png");
  const [isLoading, setIsLoading] = useState(true);
  //const { user } = useContext(UserContext);

  useEffect(() => {
    if (userContext !== null) {
      console.log("Le Usercontext changed:", userContext);
      console.log("Le First name:", userContext.user.basicInfo.firstName);
      console.log("URL de l'image actuelle:", userContext.imageUrl);
      setIsLoading(false);
    }
  }, [userContext]);

  // if (isLoading) {
  //   return <Text>Loading...</Text>; // Ou un autre indicateur de chargement
  // }

  const renderAffirmation = () => {
    if (!userContext.selectedAffirmation) {
      return "Vous n'avez pas encore sélectionné de phrase.";
    }
    console.log("Affirmation actuelle:", userContext.selectedAffirmation);
    return userContext.selectedAffirmation;
  };

  if (userContext) {
    const { user } = userContext;
    const { basicInfo } = user;
    const { firstName } = basicInfo;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.photoContainer}>
            <View style={styles.arround}>
              <View style={styles.full}></View>
            </View>
            <UserImage
              imageUrl={userContext.imageUrl}
              defaultImage={defaultImage}
            />
            {/* <UserImage
              key={userContext.imageUrl}
              imageUrl={userContext.imageUrl}
              defaultImage={defaultImage}
            /> */}
          </View>

          <View style={styles.textBonjourContainer}>
            <Text style={styles.textBonjour}>Bonjour,</Text>
            <Text style={styles.textFirstname}> {firstName}</Text>
            {/* <Text style={styles.textBonjour}> !</Text> */}
            {/* <SettingsButton onPress={() => navigation.navigate("Settings")} /> */}
            <TouchableOpacity
              style={styles.touchableIcon}
              onPress={() => navigation.navigate("Settings")}
            >
              <View>
                <Icon name="cog" style={styles.iconCog} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lowerSection}>
          {/* <View style={styles.chapeauContainer}>
            <Image
              source={require("assets/images/logoAntidote.png")}
              style={styles.logoStyle}
            />

            <Text style={styles.textChapeau}>Quésako Antidote ?!</Text>
          </View> */}
          <View style={styles.whiteBadgeContainer}>
            <View style={styles.chapeauContainerA}>
              {/* <Image
                source={require("assets/images/logoAntidote.png")}
                style={styles.logoStyleA}
              /> */}

              {/* <Text style={styles.textChapeau}>Quésako Antidote ?!</Text> */}
            </View>
            <View style={styles.bienvenueContainer}>
              <Text style={styles.textBienvenue}>Bienvenue dans </Text>
              {/* <Text style={styles.titreApp}>ZEN·ZONES!</Text> */}

              <Text style={styles.mirroredZ}>Z</Text>
              <Text style={styles.titreApp}>en·</Text>
              <Text style={styles.mirroredZ}>Z</Text>
              <Text style={styles.titreApp}>ones</Text>
            </View>

            <Text style={styles.textWhiteBadge}>
              Pour un survol de l'application, c'est par ici !
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Tab1P1")}
            >
              <Text style={styles.buttonText}>Survol</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>
            Bienvenue, {user.basicInfo.firstName}!
          </Text>
          <Text style={styles.affirmation}>{renderAffirmation()}</Text>
          {/* Autres éléments de l'écran d'accueil */}
        </View>
      </View>
    );
  }

  return null; // ou vous pouvez renvoyer un autre élément en cas d'erreur
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "space-evenly",
    //alignItems: "flex-start",
    //backgroundColor: "rgba(255,255,255,1)",
    backgroundColor: "#f5f6fa",
  },
  headerContainer: {
    //flex: 1,
    height: 110,
    flexDirection: "row",
    //  justifyContent: "flex-start",
    alignItems: "center",
    //backgroundColor: "#6f78bd",
    backgroundColor: "rgba(190,205,224,0.67)",
    paddingTop: 50,
  },

  photoContainer: {
    width: 100,
    //backgroundColor: "yellow",
    height: 100,
    marginTop: 32,
    marginLeft: 8,
  },
  arround: {
    width: 90,
    height: 90,
    backgroundColor: "rgba(173,176,211,1)",
    borderRadius: 110 / 2,
    zIndex: 0,
  },
  full: {
    width: 76,
    height: 76,
    backgroundColor: "rgba(91,93,167,1)",
    borderRadius: 96 / 2,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    marginTop: 7,
    marginLeft: 7,
    zIndex: 0,
  },

  photoProfil: {
    width: 69,
    height: 69,
    position: "absolute",
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 89 / 2,
    zIndex: 1,
  },

  textBonjourContainer: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },

  textBonjour: {
    fontFamily: "roboto",
    // color: "grey",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginTop: 15,
  },

  textFirstname: {
    fontFamily: "roboto500",
    //color: "rgba(50,56,106,1)",
    color: "white",
    fontSize: 20,
    //marginLeft: 1,
    marginTop: 15,
    //zIndex: 4,
  },

  touchableIcon: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(173,176,211,1)",
    borderRadius: 50 / 2,
    top: 23,
    left: 172,
    position: "absolute",
  },
  iconCog: {
    top: 2,
    left: 3,
    position: "absolute",
    //color: "rgba(111,120,189,1)",
    color: "white",
    fontSize: 44,
  },

  button: {
    backgroundColor: "#6f78bd",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center", // centrer le bouton
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },

  lowerSection: {
    // flex: 1,
    //justifyContent: "flex-start",
    //backgroundColor: "green",
    //alignItems: "center",
    //marginTop: 20, // Marge haute pour l'espacement si nécessaire
  },
  chapeauContainer: {
    //flex: 1,
    flexDirection: "row",
    //justifyContent: "flex-start",
    alignItems: "center",

    // backgroundColor: "green",
    //marginTop: 20, // Marge haute pour l'espacement si nécessaire
    paddingTop: 65,
    paddingBottom: 20,
    marginLeft: 20,
  },

  logoStyle: {
    width: 60, // Ajustez selon la taille souhaitée
    height: 60, // Ajustez selon la taille souhaitée
    resizeMode: "contain", // pour conserver les proportions de l'image
    // marginLeft: 10, // Espacement à gauche, si nécessaire
    transform: [{ rotate: "20deg" }],
  },

  textChapeau: {
    fontFamily: "roboto500",
    //color: "white",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    //marginTop: 15,
  },

  whiteBadgeContainer: {
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "flex-start",
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 15,
    paddingHorizontal: 25,
    paddingVertical: 20,
    //height: 150,
    marginTop: 55,
  },

  bienvenueContainer: {
    //flexGrow: 1,
    flexDirection: "row",
    // justifyContent: "flex-start",
  },

  textBienvenue: {
    fontFamily: "roboto",
    //color: "white",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    //marginTop: 15,
  },
  titreApp: {
    fontFamily: "roboto500",
    //color: "white",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    //marginTop: 15,
  },

  mirroredZ: {
    // transform: [{ scaleX: -1 }],
    fontFamily: "roboto500",
    //color: "white",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
  },

  textWhiteBadge: {
    fontFamily: "roboto",
    //color: "white",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
    lineHeight: 25,
    paddingTop: 20,
  },

  chapeauContainerA: {
    //flex: 1,
    flexDirection: "row",
    //justifyContent: "flex-start",
    alignItems: "center",

    // backgroundColor: "green",
    marginTop: -15, // Marge haute pour l'espacement si nécessaire
    // paddingTop: 65,
    //paddingBottom: 20,
    //marginLeft: 20,
    marginBottom: 10,
  },

  logoStyleA: {
    width: 60, // Ajustez selon la taille souhaitée
    height: 60, // Ajustez selon la taille souhaitée
    resizeMode: "contain", // pour conserver les proportions de l'image
    // marginLeft: 10, // Espacement à gauche, si nécessaire
    transform: [{ rotate: "20deg" }],
    marginTop: -25,
  },

  textChapeauA: {
    fontFamily: "roboto500",
    //color: "white",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    //marginTop: 15,
    // marginTop: -45,
    // justifyContent: "flex-end",
    // alignContent: "flex-end",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  affirmation: {
    fontSize: 18,
  },
});

export default Tab1;
