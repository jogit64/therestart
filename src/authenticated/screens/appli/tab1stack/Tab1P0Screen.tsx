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
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Tab1P1")}
          >
            <Text style={styles.buttonText}>Go to Tab1P1</Text>
          </TouchableOpacity> */}

          <Image
            source={defaultImage}
            resizeMode="cover"
            style={{ ...styles.photoProfil }}
          />
          <Image
            source={defaultImage}
            resizeMode="cover"
            style={{ ...styles.photoProfil }}
          />
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
  },
  headerContainer: {
    //flex: 1,
    height: 110,
    flexDirection: "row",
    //  justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#6f78bd",
    // backgroundColor: "red",
    paddingTop: 50,
  },

  photoContainer: {
    width: 120,
    //backgroundColor: "green",
    height: 120,
    marginTop: 52,
    marginLeft: 10,
  },
  arround: {
    width: 110,
    height: 110,
    backgroundColor: "rgba(173,176,211,1)",
    borderRadius: 110 / 2,
    zIndex: 0,
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
    zIndex: 0,
  },

  photoProfil: {
    width: 89,
    height: 89,
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
