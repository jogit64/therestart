import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Feather";
import { useHardwareBackButton } from "../../../../components/useHardwareBackButton";

import { auth } from "../../../../firebase.js";
import Toast from "react-native-root-toast";

export default function ConnexionSecu({ navigation }) {
  useHardwareBackButton();

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      // Pour changer le mot de passe :
      if (newPassword) {
        // newPassword est le nouveau mot de passe saisi par l'utilisateur
        await user.updatePassword(newPassword);
      }

      Toast.show(
        "Les informations de connexion ont été mises à jour.",
        Toast.LONG
      );
    } catch (error) {
      Toast.show(
        "Erreur lors de la mise à jour des informations de connexion.",
        Toast.LONG
      );
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,1)" />
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
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
                <Icon name="chevron-left" style={styles.iconGoBack}></Icon>
              </View>
            </TouchableOpacity>
            <Text style={styles.infosPersonnelles}>Connexion et sécurité</Text>
          </View>

          <View style={styles.groupMdpActu}>
            <Text style={styles.motDePasseActuel}>Mot de passe actuel</Text>
            <TextInput
              placeholder="Mot de passe (8 caractères et + )"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputMdpActu}
            ></TextInput>
          </View>
          <View style={styles.groupMdpNew}>
            <Text style={styles.nouveauMotDePasse}>Nouveau mot de passe</Text>
            <TextInput
              placeholder="Mot de passe (8 caractères et + )"
              dataDetector="address"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputMdpNew}
            ></TextInput>
          </View>
          <View style={styles.groupMdpConfirm}>
            <Text style={styles.nouveauMotDePasse1}>
              Confirmez le mot de passe
            </Text>
            <TextInput
              placeholder="Mot de passe (8 caractères et + )"
              dataDetector="address"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputMdpConfirm}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("MonProfil")}
            style={styles.groupSauvegarder}
          >
            <TouchableOpacity style={styles.buttonSauvegarder}>
              <Text style={styles.sauvegarder}>Sauvegarder</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,246,255,1)",
  },
  scrollArea: {
    width: 360,
    height: 789,
    marginTop: 22,
  },
  scrollArea_contentContainerStyle: {
    height: 789,
    width: 360,
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
  infosPersonnelles: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    marginLeft: 54,
    marginTop: 24,
  },
  goBackButtonRow: {
    height: 46,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 19,
    marginRight: 79,
  },
  groupEmail: {
    width: 298,
    height: 70,
    marginTop: 30,
    marginLeft: 30,
  },
  email: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputEmail: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 8,
    alignSelf: "center",
    paddingLeft: 10,
  },
  groupMdpActu: {
    width: 302,
    height: 69,
    marginTop: 29,
    marginLeft: 30,
  },
  motDePasseActuel: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputMdpActu: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    alignSelf: "center",
    paddingLeft: 10,
  },
  groupMdpNew: {
    width: 302,
    height: 69,
    marginTop: 26,
    marginLeft: 30,
  },
  nouveauMotDePasse: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputMdpNew: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    alignSelf: "center",
    paddingLeft: 10,
  },
  groupMdpConfirm: {
    width: 302,
    height: 69,
    marginTop: 32,
    marginLeft: 30,
  },
  nouveauMotDePasse1: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputMdpConfirm: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    alignSelf: "center",
    paddingLeft: 10,
  },
  groupSauvegarder: {
    width: 290,
    height: 57,
    overflow: "visible",
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 79,
    marginLeft: 35,
  },
  buttonSauvegarder: {
    width: 290,
    height: 55,
    backgroundColor: "rgba(111,120,189,1)",
    borderRadius: 11,
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 3,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sauvegarder: {
    fontFamily: "roboto500",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    textAlign: "center",
  },
});
