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

import { StackNavigationProp } from "@react-navigation/stack";
import { Tab1ParamList } from "../../../../../utils/navigationTypes";
import { RootStackParamList } from "../../../../../utils/navigationTypes";

import Icon from "react-native-vector-icons/Entypo";

import { useHardwareBackButton } from "components/useHardwareBackButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CombinedParamList = Tab1ParamList & RootStackParamList;

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
      setIsLoading(false);
    }
  }, [userContext]);

  // if (isLoading) {
  //   return <Text>Loading...</Text>; // Ou un autre indicateur de chargement
  // }
  useEffect(() => {
    if (userContext) {
      console.log(
        "Affirmation mise à jour PAR JO:",
        userContext.selectedAffirmation
      );
    }
  }, [userContext?.selectedAffirmation]);

  const renderAffirmation = () => {
    const affirmation = userContext?.selectedAffirmation;
    if (!affirmation) {
      return "Vous n'avez pas encore sélectionné de phrase. Rendez-vous au phare !";
    }
    return affirmation;
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
          </View>

          <View style={styles.textBonjourContainer}>
            <Text style={styles.textBonjour}>Bonjour,</Text>
            <Text style={styles.textFirstname}> {firstName}</Text>
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
          <View style={styles.whiteBadgeContainer}>
            <Text style={styles.textWhiteBadge}>Bienvenue dans </Text>
            <Text style={styles.titreApp}>Zen·Zones !</Text>
            {/* <Text style={styles.textWhiteBadge}>
              Pour mieux comprendre chaque espace, consultez le plan.
            </Text> */}
          </View>

          <View style={styles.btnPlanContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Tab1P1")}
            >
              <Text style={styles.buttonText}>Consulter le plan</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.globalQuoteContainer}>
            <View style={styles.affirmationsQuote}>
              <MaterialCommunityIcons
                name="comment-quote"
                size={30}
                color="#7e86c7"
              />
              <View style={styles.votreAffContainer}>
                <Text style={styles.votreAffText}>Votre affirmation</Text>
              </View>
            </View>
            <View style={styles.affirmationsContainer}>
              <Text style={styles.affirmation}>{renderAffirmation()}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f5f6fa",
  },

  headerContainer: {
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(190,205,224,0.67)",
    paddingTop: 50,
  },

  photoContainer: {
    width: 100,
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
    marginTop: 10.5,
    marginLeft: 10.5,
    borderRadius: 89 / 2,
    zIndex: 1,
  },

  textBonjourContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  textBonjour: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    marginTop: 15,
  },

  textFirstname: {
    fontFamily: "roboto500",
    color: "white",
    fontSize: 18,
    marginTop: 15,
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
    color: "white",
    fontSize: 44,
  },

  // FIN HEADER

  lowerSection: {},

  whiteBadgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    //marginHorizontal: 15,
    paddingHorizontal: 25,

    paddingTop: 20,
    paddingBottom: 35,
    marginTop: 55,
  },

  textWhiteBadge: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    lineHeight: 23,
    alignSelf: "center",
  },

  titreApp: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
    lineHeight: 23,
    //paddingLeft: 3,
  },

  btnPlanContainer: {
    borderRadius: 5,
    marginTop: -20,
    marginRight: 25,
  },

  button: {
    backgroundColor: "#6f78bd",
    padding: 10,
    borderRadius: 5,
    //alignSelf: "flex-end",
    alignSelf: "center",
  },

  buttonText: {
    fontFamily: "roboto500",
    color: "white",
    fontSize: 14,
  },

  globalQuoteContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(190,205,224,0.67)",
    //backgroundColor: "white",

    borderRadius: 10,
    marginHorizontal: 15,
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginTop: 55,
  },

  affirmationsQuote: {
    marginTop: -32,
    marginLeft: -20,
    zIndex: 1,
  },

  votreAffContainer: {
    alignItems: "center",
    zIndex: 0,
  },

  votreAffText: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 10,
    paddingBottom: 2,
    borderRadius: 7,
    marginTop: -31,
  },

  affirmationsContainer: {
    alignItems: "center",
    zIndex: 0,
  },

  affirmation: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "rgba(50,56,106,1)",
    lineHeight: 25,
  },
});

export default Tab1;
