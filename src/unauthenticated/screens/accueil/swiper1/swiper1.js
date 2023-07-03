import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
//import { LinearGradient } from "expo-linear-gradient"

// * imports pour le haut p1
import MaterialButtonSuccess from "./MaterialButtonSuccess";
import MaterialButtonPurple from "./MaterialButtonPurple";
import MaterialButtonSuccess1 from "./MaterialButtonSuccess1";

//import IoniconsIcon from "react-native-vector-icons/Ionicons";

//import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
//import EntypoIcon from "react-native-vector-icons/Entypo";

const Swiper1 = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.container}> */}
      <Text style={styles.titrePrincipal}>
        Croyances limitantes : libérez-vous!
      </Text>
      <Text style={styles.sousTitre}>
        Plongez dans un voyage de transformation intérieure et découvrez la
        magie de la libération des croyances limitantes.
      </Text>
      <View style={styles.ellipseMStackStackStack}>
        <View style={styles.ellipseMStackStack}>
          <View style={styles.ellipseMStack}>
            <Svg viewBox="0 0 60.48 60.48" style={styles.ellipseM}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(220,235,254,1)"
                cx={30}
                cy={30}
                rx={30}
                ry={30}
              ></Ellipse>
            </Svg>
            <Svg
              viewBox="0 0 36.82 36.82"
              style={[styles.ellipseP, { marginTop: -50 }]}
            >
              <Ellipse
                strokeWidth={0}
                fill="rgba(220,235,254,1)"
                cx={18}
                cy={18}
                rx={18}
                ry={18}
              ></Ellipse>
            </Svg>
            <View style={styles.groupBoutonEmotions}>
              <MaterialButtonSuccess
                style={styles.materialButtonSuccess}
              ></MaterialButtonSuccess>
            </View>
          </View>
          <View style={styles.groupBoutonPensees}>
            <MaterialButtonPurple
              style={styles.boutonPensees}
            ></MaterialButtonPurple>
          </View>
        </View>
        <View style={styles.ellipseGStack}>
          <Svg viewBox="0 0 145.95 145.95" style={styles.ellipseG}>
            <Ellipse
              strokeWidth={0}
              fill="rgba(220,235,254,0.67)"
              cx={73}
              cy={73}
              rx={73}
              ry={73}
            ></Ellipse>
          </Svg>
          <View style={styles.groupBoutonCroyances}>
            <MaterialButtonSuccess1
              style={styles.boutonCroyances}
            ></MaterialButtonSuccess1>
          </View>
          <View style={styles.groupRestart}>
            <View style={styles.re3Row}>
              <Text style={styles.re3}>re·</Text>
              <Text style={styles.start}>start</Text>
              <Text style={styles.re3}>!</Text>
            </View>
          </View>
        </View>
      </View>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#f9fdff",
    //backgroundColor: "red",
    justifyContent: "center", // Centrer horizontalement
    alignItems: "center",
    paddingTop: 100,
    //marginTop: 80,
  },

  titrePrincipal: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    textAlign: "center",
    //marginTop: 30,
    //marginLeft: 73,
  },
  sousTitre: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    width: 300,
    height: 60,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 15,
  },
  ellipseM: {
    top: 54,
    left: 105,
    width: 60,
    height: 60,
    position: "absolute",
  },
  groupBoutonEmotions: {
    top: 0,
    left: 0,
    width: 123,
    height: 116,
    position: "absolute",
  },
  materialButtonSuccess: {
    height: 89,
    width: 100,
    transform: [
      {
        rotate: "-18.00deg",
      },
    ],
    borderRadius: 16,
    marginTop: 55,
    marginLeft: 31,
  },
  ellipseMStack: {
    top: 54,
    left: 0,
    width: 165,
    height: 116,
    position: "absolute",
  },
  ellipseP: {
    top: 112,
    left: 3,
    width: 37,
    height: 37,
    position: "absolute",
  },
  groupBoutonPensees: {
    top: 0,
    left: 122,
    width: 116,
    height: 108,
    position: "absolute",
  },
  boutonPensees: {
    height: 89,
    width: 100,
    transform: [
      {
        rotate: "25.00deg",
      },
    ],
    borderRadius: 16,
    //backgroundColor: "rgba(126,134,199,1)",
    backgroundColor: "rgba(126,134,199,1)",
    marginTop: 9,
    marginLeft: -19,
  },
  ellipseMStackStack: {
    top: 92,
    left: 52,
    width: 238,
    height: 170,
    position: "absolute",
  },
  ellipseG: {
    top: 0,
    left: 0,
    width: 146,
    height: 146,
    position: "absolute",
  },
  groupBoutonCroyances: {
    top: 40,
    left: 45,
    width: 111,
    height: 102,
    position: "absolute",
  },
  boutonCroyances: {
    height: 89,
    width: 100,
    transform: [
      {
        rotate: "-2.00deg",
      },
    ],
    backgroundColor: "rgba(59,173,199,1)",
    borderRadius: 16,
    marginTop: 60,
    marginLeft: -18,
  },
  groupRestart: {
    top: 28,
    left: 40,
    width: 174,
    height: 52,
    position: "absolute",
    flexDirection: "row",
    //alignItems: "center",
  },
  re3: {
    fontFamily: "lemon",
    //color: "rgba(255,255,255,1)",
    color: "#fdd100",
    fontSize: 40,
    marginRight: 2,
  },
  start: {
    fontFamily: "lemon",
    color: "#121212",
    fontSize: 40,
  },
  re3Row: {
    height: 52,
    flexDirection: "row",
    flex: 1,
    marginTop: -10,
  },
  ellipseGStack: {
    top: 0,
    left: 0,
    width: 233,
    height: 146,
    position: "absolute",
  },
  ellipseMStackStackStack: {
    width: 290,
    height: 262,
    marginTop: -450,
    marginLeft: 34,
  },
});

export default Swiper1;
