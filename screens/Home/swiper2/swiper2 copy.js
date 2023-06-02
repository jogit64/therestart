import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from "react-native-vector-icons/Feather";

const Swiper2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titrePrincipal}>Retrouvez la magie d&#39;enfant</Text>
      <Text style={styles.sousTitre}>
        Tirez au sors vos souvenir d&#39;enfant pour{"\n"}ressentier une énergie
        neuve
      </Text>
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
          <Svg viewBox="0 0 115.36 115.36" style={styles.ellipseCartable1}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(253,209,0,0.49)"
              cx={58}
              cy={58}
              rx={58}
              ry={58}
            ></Ellipse>
          </Svg>
          <Text style={styles.monCartableDecole1}>
            ♪♪♪{"\n"}ça plane pour moi {"\n"}♪♪♪
          </Text>
          <Svg viewBox="0 0 115.62 115.62" style={styles.ellipseCartable2}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(0,150,136,1)"
              cx={58}
              cy={58}
              rx={58}
              ry={58}
            ></Ellipse>
          </Svg>
          <Text style={styles.monCartableDecole2}>
            premiers instants {"\n"}de vélo sans {"\n"}les petites roues
          </Text>
          <FeatherIcon name="watch" style={styles.icon3}></FeatherIcon>
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
          <View style={styles.group1}>
            <View style={styles.re1Row}>
              <Text style={styles.re1}>re·</Text>
              <Text style={styles.start1}>start</Text>
              <Text style={styles.re2}>!</Text>
            </View>
          </View>
          <Svg viewBox="0 0 68.7 68.7" style={styles.ellipseCartable3}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(187,96,221,0.72)"
              cx={34}
              cy={34}
              rx={34}
              ry={34}
            ></Ellipse>
          </Svg>
          <Text style={styles.monCartableDecole3}>
            mon cartable {"\n"}en velours {"\n"}au CE1
          </Text>
          <MaterialCommunityIconsIcon
            name="balloon"
            style={styles.icon1}
          ></MaterialCommunityIconsIcon>
          <IoniconsIcon
            name="ios-ice-cream"
            style={styles.icon2}
          ></IoniconsIcon>
        </View>
        <View style={styles.ellipsePStack}>
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
          <Svg viewBox="0 0 68.7 68.7" style={styles.ellipseCartable4}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(126,134,199,1)"
              cx={34}
              cy={34}
              rx={34}
              ry={34}
            ></Ellipse>
          </Svg>
          <Text style={styles.monCartableDecole4}>
            ma première {"\n"}montre à quartz
          </Text>
        </View>
        <IoniconsIcon
          name="ios-musical-notes"
          style={styles.icon4}
        ></IoniconsIcon>
        <EntypoIcon name="cake" style={styles.icon5}></EntypoIcon>
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
    paddingTop: 100,
    //marginTop: 80,
  },
  titrePrincipal: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 22,
    textAlign: "center",
    marginTop: 369,
    alignSelf: "center",
  },
  sousTitre: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    width: 300,
    height: 60,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 27,
    marginLeft: 25,
  },
  ellipseM: {
    top: 109,
    left: 106,
    width: 60,
    height: 60,
    position: "absolute",
  },
  ellipseCartable1: {
    left: 110,
    width: 115,
    height: 115,
    position: "absolute",
    transform: [
      {
        rotate: "-15.00deg",
      },
    ],
    top: 0,
  },
  monCartableDecole1: {
    top: 36,
    left: 118,
    position: "absolute",
    fontFamily: "roboto",
    color: "rgba(0,0,0,1)",
    fontSize: 12,
    transform: [
      {
        rotate: "24.00deg",
      },
    ],
    textAlign: "center",
    lineHeight: 14,
  },
  ellipseCartable2: {
    top: 97,
    width: 116,
    height: 116,
    position: "absolute",
    left: 35,
  },
  monCartableDecole2: {
    top: 134,
    left: 45,
    position: "absolute",
    fontFamily: "roboto",
    color: "rgba(255,255,255,1)",
    fontSize: 12,
    transform: [
      {
        rotate: "3.00deg",
      },
    ],
    textAlign: "center",
    lineHeight: 14,
  },
  icon3: {
    top: 173,
    left: 0,
    position: "absolute",
    color: "rgba(220,235,254,1)",
    fontSize: 40,
  },
  ellipseMStack: {
    top: 91,
    left: 85,
    width: 225,
    height: 213,
    position: "absolute",
  },
  ellipseG: {
    top: 0,
    left: 34,
    width: 146,
    height: 146,
    position: "absolute",
  },
  group1: {
    top: 13,
    left: 83,
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
  ellipseCartable3: {
    top: 75,
    left: 25,
    width: 95,
    height: 95,
    position: "absolute",
  },
  monCartableDecole3: {
    top: 101,
    left: 37,
    position: "absolute",
    fontFamily: "roboto",
    color: "rgba(0,0,0,1)",
    fontSize: 12,
    transform: [
      {
        rotate: "-11.00deg",
      },
    ],
    textAlign: "center",
    lineHeight: 14,
  },
  icon1: {
    top: 150,
    left: 0,
    position: "absolute",
    color: "rgba(220,235,254,1)",
    fontSize: 40,
  },
  icon2: {
    top: 109,
    left: 166,
    position: "absolute",
    color: "rgba(220,235,254,1)",
    fontSize: 49,
  },
  ellipseGStack: {
    top: 0,
    left: 0,
    width: 278,
    height: 193,
    position: "absolute",
  },
  ellipseP: {
    top: 15,
    left: 69,
    width: 37,
    height: 37,
    position: "absolute",
  },
  ellipseCartable4: {
    top: 0,
    left: 0,
    width: 82,
    height: 82,
    position: "absolute",
    transform: [
      {
        rotate: "22.00deg",
      },
    ],
  },
  monCartableDecole4: {
    top: 27,
    left: 6,
    position: "absolute",
    fontFamily: "roboto",
    color: "rgba(255,255,255,1)",
    fontSize: 10,
    transform: [
      {
        rotate: "-5.00deg",
      },
    ],
    textAlign: "center",
    lineHeight: 14,
  },
  ellipsePStack: {
    top: 189,
    left: 20,
    width: 106,
    height: 82,
    position: "absolute",
  },
  icon4: {
    top: 208,
    left: 266,
    position: "absolute",
    color: "rgba(220,235,254,1)",
    fontSize: 36,
  },
  icon5: {
    top: 153,
    left: 129,
    position: "absolute",
    color: "rgba(220,235,254,1)",
    fontSize: 29,
  },
  ellipseMStackStack: {
    width: 310,
    height: 304,
    marginTop: -437,
  },
});

export default Swiper2;
