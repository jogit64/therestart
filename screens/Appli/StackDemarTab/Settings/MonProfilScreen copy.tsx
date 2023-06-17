import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import Svg, { Ellipse } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useHardwareBackButton } from "../../../../components/useHardwareBackButton";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  getAuth,
  reauthenticateWithCredential,
  deleteUser,
  EmailAuthProvider,
} from "firebase/auth";

import { getDoc, deleteDoc, doc } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";

const db = getFirestore();

const deleteAccount = async (password, navigation) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    Alert.alert(
      "Confirmation de suppression",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            const credential = EmailAuthProvider.credential(
              user.email,
              password
            );

            try {
              await reauthenticateWithCredential(user, credential);
            } catch (error) {
              console.error("Failed to re-authenticate user.", error);
              if (error.code === "auth/wrong-password") {
                Alert.alert(
                  "Erreur de mot de passe",
                  "Le mot de passe que vous avez saisi est incorrect.",
                  [
                    {
                      text: "OK",
                    },
                  ]
                );
                return;
              }
              return;
            }

            const userDocRef = doc(db, "users", user.uid);
            try {
              await deleteDoc(userDocRef);
            } catch (error) {
              console.error("Failed to delete user document.", error);
            }

            try {
              await user.delete();
            } catch (error) {
              console.error("Failed to delete user account.", error);
            }

            Alert.alert(
              "Compte supprimé",
              "Votre compte a été supprimé avec succès.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("Login"), // Redirection vers l'écran de connexion
                },
              ]
            );
          },
        },
      ]
    );
  }
};

export default function MonProfilScreen({ navigation }) {
  const [isPasswordValid, setisPasswordValid] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  useHardwareBackButton();
  const [password, setPassword] = useState("");

  const handlePasswordChange = (password) => {
    setPassword(password);
    validatePassword(password);
  };

  const inputStyle = {
    ...styles.input,
    borderColor: isPasswordValid ? "#6f78bd" : "rgba(220,222,235,1)",
  };

  const buttonStyle = {
    ...styles.buttonSupprimer,
    // backgroundColor: isPasswordValid ? "#e95120" : "rgba(255,255,255,1)",
    backgroundColor: isPasswordValid ? "#e95120" : "#dcdeeb",
    alignSelf: "center", // to center the button horizontally
  };

  const buttonTextStyle = isPasswordValid
    ? styles.activeButtonText
    : styles.buttonText;

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const validatePassword = (password) => {
    const isValid = password.length >= 3;
    setisPasswordValid(isValid);
  };

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
      <Text style={styles.titreSuppr}>Supprimer mon compte</Text>
      <Text style={styles.infoMessage}>
        Pour supprimer votre compte, veuillez renseigner votre mot de passe.
      </Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={inputStyle}
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Entrez votre mot de passe"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setPasswordVisibility(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonSupprimerContainer}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => deleteAccount(password, navigation)}
          disabled={!isPasswordValid}
        >
          <Text style={buttonTextStyle}>Supprimer mon compte</Text>
        </TouchableOpacity>
      </View>
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

  titreSuppr: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginLeft: 83,
    marginTop: 65,
  },

  buttonSupprimer: {
    width: 260,
    height: 44,
    //backgroundColor: "#dcdeeb",
    borderRadius: 10,
    justifyContent: "center", // to center the text vertically
    alignItems: "center", // to center the text horizontally
    marginVertical: 20,
  },

  buttonText: {
    color: "#121212",
    fontSize: 15,
    fontFamily: "roboto",
  },

  activeButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "roboto",
  },

  // buttonSupprimerActive: {
  //   backgroundColor: "#6f78bd",
  // },

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

  input: {
    fontFamily: "roboto",
    color: "#121212",
    height: 55,
    width: 260,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,

    borderRadius: 14,
    padding: 10,
    marginTop: 10,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Si vous voulez centrer l'ensemble horizontalement
  },
  infoMessage: {
    fontFamily: "roboto",
    fontSize: 14,
    color: "rgba(50,56,106,1)",
    marginHorizontal: 50, // Ajustez ces valeurs comme vous le souhaitez
    //marginVertical: 10,
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center", // Si vous voulez centrer le texte
  },
  eyeButton: {
    marginLeft: -30,
  },
});
