import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,1)" />
      <View style={styles.goBackButtonRow}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.goBackButton}
        >
          <View style={styles.ellipseGoBackStack}>
            <Svg viewBox="0 0 24.55 24.55" style={styles.ellipseGoBack}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(255,255,255,1)"
                cx={12}
                cy={12}
                rx={12}
                ry={12}
              ></Ellipse>
            </Svg>
            <FeatherIcon
              name="chevron-left"
              style={styles.iconGoBack}
            ></FeatherIcon>
          </View>
        </TouchableOpacity>
        <Text style={styles.titreReglages}>Réglages</Text>
      </View>
      <Text style={styles.labelCompte}>Compte</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("MonProfil")}
        style={styles.groupProfil}
      >
        <TouchableOpacity style={styles.buttonmonProfil}>
          <View style={styles.iconmonProfilRow}>
            <MaterialCommunityIconsIcon
              name="account"
              style={styles.iconmonProfil}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.labelmonProfil}>Mon profil</Text>
          </View>
          <View style={styles.iconmonProfilRowFiller}></View>
          <FeatherIcon
            name="chevron-right"
            style={styles.chevronMonprofil}
          ></FeatherIcon>
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.labelLapplication}>L&#39;application</Text>
      <View style={styles.groupTutoriel}>
        <TouchableOpacity style={styles.buttonTutoriel}>
          <View style={styles.iconTutorielRowRow}>
            <View style={styles.iconTutorielRow}>
              <MaterialCommunityIconsIcon
                name="play-circle"
                style={styles.iconTutoriel}
              ></MaterialCommunityIconsIcon>
              <Text style={styles.labelTutoriel}>
                Tutoriel de l&#39;application
              </Text>
            </View>
            <View style={styles.iconTutorielRowFiller}></View>
            <FeatherIcon
              name="chevron-right"
              style={styles.chevronTutoriel}
            ></FeatherIcon>
          </View>
          <View style={styles.lignTutoFAQ}></View>
        </TouchableOpacity>
      </View>
      <View style={styles.groupFAQ}>
        <TouchableOpacity style={styles.buttonFAQ}>
          <View style={styles.iconFAQRow}>
            <MaterialCommunityIconsIcon
              name="comment-question"
              style={styles.iconFAQ}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.labelFAQ}>FAQ</Text>
          </View>
          <View style={styles.iconFAQRowFiller}></View>
          <FeatherIcon
            name="chevron-right"
            style={styles.chevronFAQ}
          ></FeatherIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.lignFaqTerme}></View>
      <View style={styles.groupTermes}>
        <TouchableOpacity style={styles.buttonTermes}>
          <View style={styles.iconTermesRow}>
            <MaterialCommunityIconsIcon
              name="file-document"
              style={styles.iconTermes}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.labelTermes}>Termes et conditions</Text>
          </View>
          <View style={styles.iconTermesRowFiller}></View>
          <FeatherIcon
            name="chevron-right"
            style={styles.chevronTermes}
          ></FeatherIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.lignTermePolitique}></View>
      <View style={styles.groupPolitique}>
        <TouchableOpacity style={styles.buttonPolitique}>
          <View style={styles.iconPolitiqueRow}>
            <MaterialCommunityIconsIcon
              name="marker-check"
              style={styles.iconPolitique}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.labelPolitique}>
              Politique de confidentialité
            </Text>
          </View>
          <View style={styles.iconPolitiqueRowFiller}></View>
          <FeatherIcon
            name="chevron-right"
            style={styles.chevronPolitique}
          ></FeatherIcon>
        </TouchableOpacity>
      </View>
      <Text style={styles.seDeconnecter}>Se déconnecter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,246,255,1)",
  },
  goBackButton: {
    width: 32,
    height: 35,
  },
  ellipseGoBack: {
    top: 1,
    left: 0,
    width: 25,
    height: 25,
    position: "absolute",
  },
  iconGoBack: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(113,119,181,1)",
    fontSize: 26,
  },
  ellipseGoBackStack: {
    width: 26,
    height: 26,
    marginTop: 4,
    marginLeft: 4,
  },
  titreReglages: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginLeft: 87,
    marginTop: 5,
  },
  goBackButtonRow: {
    height: 35,
    flexDirection: "row",
    marginTop: 46,
    marginLeft: 19,
    marginRight: 138,
  },
  labelCompte: {
    fontFamily: "roboto",
    color: "rgba(152,156,183,1)",
    marginTop: 26,
    marginLeft: 23,
  },
  groupProfil: {
    width: 323,
    height: 57,
    marginTop: 8,
    marginLeft: 21,
  },
  buttonmonProfil: {
    width: 323,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 21,
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 9,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    flexDirection: "row",
  },
  iconmonProfil: {
    color: "rgba(111,120,189,1)",
    fontSize: 27,
    height: 29,
    width: 27,
  },
  labelmonProfil: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginLeft: 6,
    marginTop: 6,
  },
  iconmonProfilRow: {
    height: 29,
    flexDirection: "row",
    marginLeft: 16,
    marginTop: 14,
  },
  iconmonProfilRowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  chevronMonprofil: {
    color: "rgba(152,156,181,1)",
    fontSize: 26,
    height: 26,
    width: 26,
    marginRight: 18,
    marginTop: 16,
  },
  labelLapplication: {
    fontFamily: "roboto",
    color: "rgba(152,156,183,1)",
    marginTop: 35,
    marginLeft: 21,
  },
  groupTutoriel: {
    width: 323,
    height: 57,
    marginTop: 9,
    marginLeft: 19,
  },
  buttonTutoriel: {
    width: 323,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 9,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    borderTopRightRadius: 21,
    borderTopLeftRadius: 21,
  },
  iconTutoriel: {
    color: "rgba(111,120,189,1)",
    fontSize: 27,
    height: 29,
    width: 27,
  },
  labelTutoriel: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginLeft: 6,
    marginTop: 6,
  },
  iconTutorielRow: {
    height: 29,
    flexDirection: "row",
  },
  iconTutorielRowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  chevronTutoriel: {
    color: "rgba(152,156,181,1)",
    fontSize: 26,
    height: 26,
    width: 26,
    marginTop: 2,
  },
  iconTutorielRowRow: {
    height: 29,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 16,
    marginRight: 12,
  },
  lignTutoFAQ: {
    width: 290,
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 12,
    marginLeft: 16,
  },
  groupFAQ: {
    width: 295,
    height: 29,
    marginTop: 13,
    marginLeft: 34,
  },
  buttonFAQ: {
    width: 323,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 9,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    flexDirection: "row",
    marginTop: -14,
    marginLeft: -15,
  },
  iconFAQ: {
    color: "rgba(111,120,189,1)",
    fontSize: 27,
    height: 29,
    width: 27,
  },
  labelFAQ: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginLeft: 11,
    marginTop: 6,
  },
  iconFAQRow: {
    height: 29,
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 14,
  },
  iconFAQRowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  chevronFAQ: {
    color: "rgba(152,156,181,1)",
    fontSize: 26,
    height: 26,
    width: 26,
    marginRight: 13,
    marginTop: 14,
  },
  lignFaqTerme: {
    width: 290,
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 11,
    marginLeft: 35,
  },
  groupTermes: {
    width: 295,
    height: 29,
    marginTop: 16,
    marginLeft: 34,
  },
  buttonTermes: {
    width: 323,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 9,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    flexDirection: "row",
    marginTop: -14,
    marginLeft: -15,
  },
  iconTermes: {
    color: "rgba(111,120,189,1)",
    fontSize: 27,
    height: 29,
    width: 27,
  },
  labelTermes: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginLeft: 11,
    marginTop: 6,
  },
  iconTermesRow: {
    height: 29,
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 14,
  },
  iconTermesRowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  chevronTermes: {
    color: "rgba(152,156,181,1)",
    fontSize: 26,
    height: 26,
    width: 26,
    marginRight: 13,
    marginTop: 14,
  },
  lignTermePolitique: {
    width: 290,
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 15,
    marginLeft: 35,
  },
  groupPolitique: {
    width: 295,
    height: 29,
    marginTop: 11,
    marginLeft: 34,
  },
  buttonPolitique: {
    width: 323,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 9,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    borderBottomRightRadius: 21,
    borderBottomLeftRadius: 21,
    flexDirection: "row",
    marginTop: -14,
    marginLeft: -15,
  },
  iconPolitique: {
    color: "rgba(111,120,189,1)",
    fontSize: 27,
    height: 29,
    width: 27,
  },
  labelPolitique: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginLeft: 11,
    marginTop: 6,
  },
  iconPolitiqueRow: {
    height: 29,
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 14,
  },
  iconPolitiqueRowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  chevronPolitique: {
    color: "rgba(152,156,181,1)",
    fontSize: 26,
    height: 26,
    width: 26,
    marginRight: 13,
    marginTop: 14,
  },
  seDeconnecter: {
    fontFamily: "roboto500",
    color: "rgba(111,120,189,1)",
    fontSize: 14,
    marginTop: 88,
    alignSelf: "center",
  },
});

export default SettingsScreen;