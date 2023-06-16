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
import { useHardwareBackButton } from "../../../../components/useHardwareBackButton";

//const MonProfilScreen: React.FC = () => {

export default function MonProfilScreen({ navigation }) {
  useHardwareBackButton();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,1)" />
      <View style={styles.goBackButtonRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <View style={styles.ellipseGoBackStack}>
            <Svg viewBox="0 0 28.06 28.06" style={styles.ellipseGoBack}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(255,255,255,1)"
                cx={14}
                cy={14}
                rx={14}
                ry={14}
              ></Ellipse>
            </Svg>
            <FeatherIcon
              name="chevron-left"
              style={styles.iconGoBack}
            ></FeatherIcon>
          </View>
        </TouchableOpacity>
        <Text style={styles.monProfil6}>Mon profil</Text>
      </View>
      <View style={styles.lignPolitique}></View>
      <TouchableOpacity
        style={styles.buttonInfosPerso}
        onPress={() => navigation.navigate("InfosPerso")}
      >
        <Text style={styles.infosPersonnelles}>Infos personnelles</Text>
        <View style={styles.infosPersonnellesFiller}></View>
        <FeatherIcon
          name="chevron-right"
          style={styles.chevronInfosPerso}
        ></FeatherIcon>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecu}
        onPress={() => navigation.navigate("ConnexSecu")}
      >
        <View style={styles.lignInfo}></View>
        <View style={styles.nousSecuRow}>
          <Text style={styles.nousSecu}>Connexion et sécurité</Text>
          <View style={styles.nousSecuFiller}></View>
          <FeatherIcon
            name="chevron-right"
            style={styles.chevronContact}
          ></FeatherIcon>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSupprimer}>
        <Text style={styles.supprimerMonCompte}>Supprimer mon compte</Text>
        <View style={styles.supprimerMonCompteFiller}></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  goBackButton: {
    width: 32,
    height: 35,
  },
  ellipseGoBack: {
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    position: "absolute",
  },
  iconGoBack: {
    top: 2,
    left: 0,
    position: "absolute",
    color: "rgba(113,119,181,1)",
    fontSize: 26,
  },
  ellipseGoBackStack: {
    width: 28,
    height: 28,
    marginTop: 2,
    marginLeft: 4,
  },
  monProfil6: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginLeft: 83,
    marginTop: 5,
  },
  goBackButtonRow: {
    height: 35,
    flexDirection: "row",
    marginTop: 46,
    marginLeft: 19,
    marginRight: 134,
  },
  lignPolitique: {
    backgroundColor: "#E6E6E6",
    marginTop: 396,
    marginLeft: 35,
    height: 0,
    width: 0,
    opacity: 0,
  },
  buttonInfosPerso: {
    width: 323,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    borderTopRightRadius: 21,
    borderTopLeftRadius: 21,
    shadowColor: "rgba(225,229,245,1)",
    shadowOffset: {
      height: -8,
      width: 2,
    },
    elevation: 60,
    shadowOpacity: 0.64,
    shadowRadius: 20,
    flexDirection: "row",
    marginTop: -374,
    marginLeft: 19,
  },
  infosPersonnelles: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginLeft: 32,
    marginTop: 20,
  },
  infosPersonnellesFiller: {
    flex: 1,
    flexDirection: "row",
  },
  chevronInfosPerso: {
    color: "rgba(152,156,181,1)",
    fontSize: 26,
    height: 26,
    width: 26,
    marginRight: 12,
    marginTop: 16,
  },
  buttonSecu: {
    width: 323,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomRightRadius: 21,
    borderBottomLeftRadius: 21,
    shadowColor: "rgba(225,229,245,1)",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    elevation: 60,
    shadowOpacity: 0.64,
    shadowRadius: 20,
    marginLeft: 19,
  },
  lignInfo: {
    width: 290,
    height: 1,
    backgroundColor: "#E6E6E6",
    marginLeft: 16,
  },
  nousSecu: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginTop: 3,
  },
  nousSecuFiller: {
    flex: 1,
    flexDirection: "row",
  },
  chevronContact: {
    color: "rgba(152,156,181,1)",
    fontSize: 26,
    height: 26,
    width: 26,
  },
  nousSecuRow: {
    height: 26,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 32,
    marginRight: 11,
  },
  buttonSupprimer: {
    width: 323,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 21,
    shadowColor: "rgba(225,229,245,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 1,
    shadowRadius: 20,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 21,
  },
  supprimerMonCompte: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginLeft: 30,
    marginTop: 20,
  },
  supprimerMonCompteFiller: {
    flex: 1,
    flexDirection: "row",
  },
  chevronSupprimer: {
    color: "rgba(152,156,181,1)",
    fontSize: 26,
    height: 26,
    width: 26,
    marginRight: 18,
    marginTop: 15,
  },
});
