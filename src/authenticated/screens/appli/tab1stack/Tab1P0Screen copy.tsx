import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
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

interface SalutationProps {
  firstName: string;
}

type CombinedParamList = Tab1ParamList & RootStackParamList;

type ProfileIconProps = {
  navigation: StackNavigationProp<CombinedParamList>;
};

const Salutation: React.FC<SalutationProps> = ({ firstName }) => (
  <View style={Tab1Styles.bonjour1StackRow}>
    <View style={Tab1Styles.bonjour1Stack}>
      <Text style={Tab1Styles.bonjour1}>Bonjour,</Text>
      <Text style={Tab1Styles.firstname}>{firstName}!</Text>
    </View>
  </View>
);

const ProfileIcon = ({ navigation }: ProfileIconProps) => (
  <TouchableOpacity
    style={Tab1Styles.iconContainer}
    onPress={() => navigation.navigate("Settings")}
  >
    <View style={Tab1Styles.ellipseFondIcon1Stack}>
      <Svg viewBox="0 0 28.77 29.34" style={Tab1Styles.ellipseFondIcon1}>
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
        style={Tab1Styles.iconSettings1}
      ></MaterialCommunityIconsIcon>
    </View>
  </TouchableOpacity>
);

const UserProfile = () => (
  <View style={Tab1Styles.groupUser2group}>
    <View style={Tab1Styles.groupUserFon2Ronds}>
      <ImageBackground
        style={Tab1Styles.rondUsercontour1}
        imageStyle={Tab1Styles.rondUsercontour1_imageStyle}
        source={require("assets/images/Gradient_jOL2tsn.png")}
      >
        <ImageBackground
          style={Tab1Styles.rondUsercontour}
          imageStyle={Tab1Styles.rondUsercontour_imageStyle}
          source={require("assets/images/Gradient_jOL2tsn.png")}
        >
          <View style={Tab1Styles.groupUserElilipse}>
            <View style={Tab1Styles.ellipseUserStack}>
              <Svg viewBox="0 0 67.27 67.27" style={Tab1Styles.ellipseUser}>
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
                style={Tab1Styles.iconUser}
              ></MaterialCommunityIconsIcon>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  </View>
);

function Tab1() {
  const navigation = useNavigation<StackNavigationProp<CombinedParamList>>();

  const userContext = useContext<UserContextInterface | null>(UserContext);

  if (userContext === null) {
    return null;
  }

  const { user } = userContext;
  const { basicInfo } = user;
  const { firstName } = basicInfo;

  return (
    <View style={Tab1Styles.container}>
      <ImageBackground
        imageStyle={Tab1Styles.rect1_imageStyle}
        source={require("assets/images/fondBonjourFirst.png")}
      >
        <Salutation firstName={firstName} />
        <ProfileIcon navigation={navigation} />
        <UserProfile />

        {/* Add your button here */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Tab1P1")}
          >
            <Text style={styles.buttonText}>Go to Tab1P1</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6f78bd",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    //position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

export default Tab1;
