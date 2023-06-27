import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext, {
  UserContextInterface,
} from "../../../../../utils/UserContext";

import { useNavigation } from "@react-navigation/native";
import Tab1Styles from "../../../styles/Tab1Styles";

import { StackNavigationProp } from "@react-navigation/stack";
import { Tab1ParamList } from "../../../../../utils/navigationTypes";
import { RootStackParamList } from "../../../../../utils/navigationTypes";

import Icon from "react-native-vector-icons/Entypo";

// interface SalutationProps {
//   firstName: string;
// }

type CombinedParamList = Tab1ParamList & RootStackParamList;

// type ProfileIconProps = {
//   navigation: StackNavigationProp<CombinedParamList>;
// };

const Salutation: React.FC<SalutationProps> = ({ firstName }) => (
  <View style={Tab1Styles.bonjour1StackRow}>
    <View style={Tab1Styles.bonjour1Stack}>
      <Text style={Tab1Styles.bonjour1}>Bonjour,</Text>
      <Text style={Tab1Styles.firstname}>{firstName}!</Text>
    </View>
  </View>
);

// const ProfileIcon = ({ navigation }: ProfileIconProps) => (
//   <TouchableOpacity
//     style={Tab1Styles.iconContainer}
//     onPress={() => navigation.navigate("Settings")}
//   >
//     <View style={Tab1Styles.ellipseFondIcon1Stack}>
//       <Svg viewBox="0 0 28.77 29.34" style={Tab1Styles.ellipseFondIcon1}>
//         <Ellipse
//           stroke="rgba(230, 230, 230,1)"
//           strokeWidth={0}
//           fill="rgba(255,255,255,1)"
//           cx={14}
//           cy={15}
//           rx={14}
//           ry={15}
//         ></Ellipse>
//       </Svg>
//       <MaterialCommunityIconsIcon
//         name="cog"
//         style={Tab1Styles.iconSettings1}
//       ></MaterialCommunityIconsIcon>
//     </View>
//   </TouchableOpacity>
// );

// const UserProfile = () => (
//   <View style={Tab1Styles.groupUser2group}>
//     <View style={Tab1Styles.groupUserFon2Ronds}>
//       <ImageBackground
//         style={Tab1Styles.rondUsercontour1}
//         imageStyle={Tab1Styles.rondUsercontour1_imageStyle}
//         source={require("assets/images/Gradient_jOL2tsn.png")}
//       >
//         <ImageBackground
//           style={Tab1Styles.rondUsercontour}
//           imageStyle={Tab1Styles.rondUsercontour_imageStyle}
//           source={require("assets/images/Gradient_jOL2tsn.png")}
//         >
//           <View style={Tab1Styles.groupUserElilipse}>
//             <View style={Tab1Styles.ellipseUserStack}>
//               <Svg viewBox="0 0 67.27 67.27" style={Tab1Styles.ellipseUser}>
//                 <Ellipse
//                   stroke="rgba(230, 230, 230,1)"
//                   strokeWidth={0}
//                   fill="rgba(255,255,255,1)"
//                   cx={34}
//                   cy={34}
//                   rx={34}
//                   ry={34}
//                 ></Ellipse>
//               </Svg>
//               <MaterialCommunityIconsIcon
//                 name="account"
//                 style={Tab1Styles.iconUser}
//               ></MaterialCommunityIconsIcon>
//             </View>
//           </View>
//         </ImageBackground>
//       </ImageBackground>
//     </View>
//   </View>
// );

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
    <View style={styles.container}>
      <ImageBackground
        style={styles.fondHaut}
        imageStyle={styles.fondHaut_imageStyle}
        source={require("assets/images/Gradient_zagbeIB.png")}
      >
        <View style={styles.bonjour1StackRow}>
          <View style={styles.bonjour1Stack}>
            <Text style={styles.bonjour1}>Bonjour,</Text>
            <Text style={styles.souda}>{firstName}!</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonSettings}
            onPress={() => navigation.navigate("Settings")}
          >
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
                ></Ellipse>
              </Svg>
              <Icon name="cog" style={styles.iconCog}></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.groupUser2group}>
          <View style={styles.groupUserFon2Ronds}>
            <ImageBackground
              style={styles.rondUsercontour1}
              imageStyle={styles.rondUsercontour1_imageStyle}
              source={require("assets/images/Gradient_jOL2tsn.png")}
            >
              <ImageBackground
                style={styles.rondUsercontour}
                imageStyle={styles.rondUsercontour_imageStyle}
                source={require("assets/images/Gradient_jOL2tsn.png")}
              >
                <Image
                  source={require("assets/images/userHead.png")}
                  resizeMode="contain"
                  style={styles.photoProfil}
                ></Image>
              </ImageBackground>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  fondHaut: {
    width: 360,
    height: 203,
    borderRadius: 52,
    shadowColor: "rgba(220,221,241,1)",
    shadowOffset: {
      height: 7,
      width: 0,
    },
    elevation: 33,
    shadowOpacity: 1,
    shadowRadius: 11,
    borderBottomRightRadius: 57,
    borderBottomLeftRadius: 57,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 23,
    alignSelf: "center",
    overflow: "hidden",
  },
  fondHaut_imageStyle: {},
  bonjour1: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    textAlign: "center",
    position: "absolute",
    left: 0,
    height: 22,
    width: 93,
    bottom: 0,
  },
  souda: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    textAlign: "center",
    position: "absolute",
    left: 64,
    height: 22,
    width: 93,
    bottom: 0,
  },
  bonjour1Stack: {
    width: 157,
    height: 22,
    alignSelf: "flex-end",
    marginBottom: 3,
  },
  buttonSettings: {
    width: 29,
    height: 29,
    marginLeft: 54,
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
    marginTop: 27,
    marginLeft: 102,
    marginRight: 18,
  },
  groupUser2group: {
    width: 112,
    height: 105,
    marginTop: 23,
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
  photoProfil: {
    width: 76,
    height: 76,
    marginTop: 2,
    marginLeft: 5,
  },
});

export default Tab1;
