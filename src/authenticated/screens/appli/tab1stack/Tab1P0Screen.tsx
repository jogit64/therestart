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

const UserGreeting = ({ firstName }) => (
  <View style={styles.bonjour1Stack}>
    <Text style={styles.textBonjour}>Bonjour,</Text>
    <Text style={styles.textFirstname}>{firstName}!</Text>
  </View>
);

const SettingsButton = ({ onPress }) => (
  <TouchableOpacity style={styles.buttonSettings} onPress={onPress}>
    <View style={styles.ellipseFondIconStack}>
      <Svg viewBox="0 0 28.77 29.34" style={styles.ellipseFondIcon}>
        <Ellipse
          stroke="rgba(230, 230, 230,1)"
          strokeWidth={0}
          //fill="rgba(255,255,255,1)"
          fill="red"
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
    resizeMode="cover"
    style={{ ...styles.photoProfil }}
  />
);

function Tab1() {
  useHardwareBackButton();
  const navigation = useNavigation<StackNavigationProp<CombinedParamList>>();
  const userContext = useContext<UserContextInterface | null>(UserContext);
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

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          {/* <View style={styles.bonjour1StackRow}>
            <UserGreeting firstName={firstName} />
            <Text> Bonjour {firstName}</Text>
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
          /> */}
          <View style={styles.photoContainer}>
            <View style={styles.arround}>
              <View style={styles.full}></View>
            </View>
            <UserImage
              imageUrl={userContext.imageUrl}
              defaultImage={defaultImage}
            />
          </View>

          <View style={styles.textBonjourContainer}>
            <Text style={styles.textBonjour}>Bonjour</Text>
            <Text style={styles.textFirstname}> {firstName}</Text>
            <Text style={styles.textBonjour}> !</Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Tab1P1")}
          >
            <Text style={styles.buttonText}>Go to Tab1P1</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null; // ou vous pouvez renvoyer un autre élément en cas d'erreur
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //backgroundColor: "rgba(255,255,255,1)",
    backgroundColor: "#f5f6fa",
    flexDirection: "column",
    //justifyContent: "space-around",
    //paddingTop: 20,
  },
  headerContainer: {
    //flex: 1,
    height: 110,
    flexDirection: "row",
    //  justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#6f78bd",
    // backgroundColor: "red",
    //marginTop: 50,
    paddingTop: 50,
    //paddingBottom: 25,
  },

  photoContainer: {
    width: 120,
    //backgroundColor: "green",
    height: 120,
    //marginTop: 18,
    //marginBottom: 10,
    marginTop: 45,
    marginLeft: 10,
  },
  arround: {
    width: 110,
    height: 110,
    backgroundColor: "rgba(173,176,211,1)",
    borderRadius: 110 / 2,
  },
  full: {
    width: 96,
    height: 96,
    backgroundColor: "rgba(91,93,167,1)",
    borderRadius: 96 / 2,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    marginTop: 7,
    marginLeft: 7,
  },

  photoProfil: {
    width: 89,
    height: 89,
    position: "absolute",
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 89 / 2,
  },

  textBonjourContainer: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
  },

  textBonjour: {
    fontFamily: "roboto",
    color: "white",
    //color: "rgba(50,56,106,1)",
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

  lowerSection: {
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "green",
    alignItems: "center",
    //marginTop: 20, // Marge haute pour l'espacement si nécessaire
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

  ellipseFondIconStack: {
    width: 29,
    height: 29,
  },
  bonjour1StackRow: {
    height: 59,
    flexDirection: "row",
    justifyContent: "center", // Centrer horizontalement
    //alignItems: "center",
    marginTop: 37,
    backgroundColor: "red",
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
  // rondUsercontour_imageStyle: {},
  // photoProfil: {
  //   width: 81,
  //   height: 81,
  //   marginTop: 50,
  //   marginLeft: 30,
  //   borderRadius: 50,
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
});

export default Tab1;
