import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
//import { LinearGradient } from "expo-linear-gradient"

// * imports pour le haut p3
import FeatherIcon from "react-native-vector-icons/Feather";
// import MaterialButtonSuccess from "./MaterialButtonSuccess";
// import MaterialButtonPurple from "./MaterialButtonPurple";
// import MaterialButtonSuccess1 from "./MaterialButtonSuccess1";

//import IoniconsIcon from "react-native-vector-icons/Ionicons";

//import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
//import EntypoIcon from "react-native-vector-icons/Entypo";

const Swiper3 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.groupEllipsesStack}>
        <View style={styles.groupEllipses}>
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
          <Svg viewBox="0 0 36.82 36.82" style={styles.ellipseP}>
            <Ellipse
              strokeWidth={0}
              fill="rgba(220,235,254,1)"
              cx={18}
              cy={18}
              rx={18}
              ry={18}
            ></Ellipse>
          </Svg>
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
        </View>
        <View style={styles.groupStart}>
          <View style={styles.re1Row}>
            <Text style={styles.re1}>re·</Text>
            <Text style={styles.start1}>start</Text>
            <Text style={styles.re2}>!</Text>
          </View>
        </View>
        <View style={styles.groupCartes}>
          <View style={styles.rect2Stack}>
            <View style={styles.rect2}></View>
            <View style={styles.rect1}>
              <FeatherIcon
                name="check-circle"
                style={styles.icon1}
              ></FeatherIcon>
            </View>
            <View style={styles.rect}>
              <FeatherIcon
                name="check-circle"
                style={styles.icon}
              ></FeatherIcon>
              <Text style={styles.textPermis}>Passer le permis bateau</Text>
              <Text style={styles.textObj}>objectif octobre</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.groupTitre}>
        <View style={styles.titrePrincipalStack}>
          <Text style={styles.titrePrincipal}>
            Listez vos projets{"\n"}stimulants
          </Text>
          <Text style={styles.sousTitre}>
            Des questions pour vous aider à vous désifdentifier de vos croyances
            et désamorcer vos pensées et émotions limitantes
          </Text>
        </View>
      </View>
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
    //paddingTop: 100,
    //marginTop: 80,
  },

  groupEllipses: {
    top: 0,
    left: 0,
    width: 217,
    height: 261,
    position: "absolute",
  },
  ellipseG: {
    width: 146,
    height: 146,
  },
  ellipseP: {
    width: 37,
    height: 37,
    marginTop: 3,
  },
  ellipseM: {
    width: 60,
    height: 60,
    marginTop: 14,
    marginLeft: 157,
  },
  groupStart: {
    top: 13,
    left: 49,
    width: 195,
    height: 52,
    position: "absolute",
    flexDirection: "row",
  },
  re1: {
    fontFamily: "lemon",
    color: "rgba(253,209,0,1)",
    fontSize: 40,
  },
  start1: {
    fontFamily: "lemon",
    color: "#121212",
    fontSize: 40,
  },
  re2: {
    fontFamily: "lemon",
    color: "rgba(253,209,0,1)",
    fontSize: 40,
    marginLeft: 3,
  },
  re1Row: {
    height: 52,
    flexDirection: "row",
    flex: 1,
  },
  groupCartes: {
    top: 93,
    width: 211,
    height: 155,
    position: "absolute",
    left: 41,
  },
  rect2: {
    top: 0,
    left: 10,
    width: 177,
    height: 97,
    position: "absolute",
    backgroundColor: "rgba(250,249,254,1)",
    borderRadius: 16,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.21,
    shadowRadius: 10,
    transform: [
      {
        rotate: "6.00deg",
      },
    ],
  },
  rect1: {
    top: 5,
    left: 7,
    width: 182,
    height: 97,
    position: "absolute",
    backgroundColor: "rgba(250,249,254,1)",
    borderRadius: 16,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.26,
    shadowRadius: 10,
    transform: [
      {
        rotate: "-1.00deg",
      },
    ],
  },
  icon1: {
    color: "rgba(254,213,1,1)",
    fontSize: 20,
    opacity: 0.29,
    height: 20,
    width: 20,
    marginTop: 12,
    marginLeft: 12,
  },
  rect: {
    top: 16,
    left: 0,
    width: 197,
    height: 116,
    position: "absolute",
    backgroundColor: "rgba(254,254,254,1)",
    borderRadius: 16,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 45,
    shadowOpacity: 0.28,
    shadowRadius: 15,
    transform: [
      {
        rotate: "-8.00deg",
      },
    ],
  },
  icon: {
    color: "rgba(254,213,1,1)",
    fontSize: 20,
    height: 20,
    width: 20,
    marginTop: 22,
    marginLeft: 7,
  },
  textPermis: {
    fontFamily: "roboto",
    color: "#121212",
    transform: [
      {
        rotate: "-8.00deg",
      },
    ],
    marginTop: 4,
    marginLeft: 23,
  },
  textObj: {
    fontFamily: "roboto",
    color: "rgba(162,164,185,1)",
    fontSize: 8,
    transform: [
      {
        rotate: "-8.00deg",
      },
    ],
    marginTop: 10,
    marginLeft: 73,
  },
  rect2Stack: {
    width: 197,
    height: 132,
    marginTop: 9,
    marginLeft: 7,
  },
  groupEllipsesStack: {
    width: 252,
    height: 261,
    //marginTop: 45,
    // marginLeft: 34,
  },
  groupTitre: {
    width: 360,
    height: 155,
    marginTop: 44,
    //alignSelf: "center",
  },
  titrePrincipal: {
    top: 0,
    position: "absolute",
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 22,
    textAlign: "center",
    alignSelf: "center",
    //left: 0,
  },
  sousTitre: {
    top: 72,
    position: "absolute",
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    width: 300,
    height: 60,
    textAlign: "center",
    lineHeight: 20,
    //left: 25,
    alignSelf: "center",
    //margintop: 15,
  },
  titrePrincipalStack: {
    // width: 360,
    // height: 112,
  },
});

export default Swiper3;
