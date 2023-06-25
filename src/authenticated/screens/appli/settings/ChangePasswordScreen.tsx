import React, { useState } from "react";
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

import { auth } from "../../../../../utils/firebase.js";
import { EmailAuthProvider } from "firebase/auth";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useHardwareBackButton } from "components/useHardwareBackButton";

import Toast from "react-native-root-toast";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../utils/navigationTypes";

export default function ChangePasswordScreen() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "ChangePassword">>();

  useHardwareBackButton();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [activeInput, setActiveInput] = useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const handleFocus = (name: string) => {
    setActiveInput(name);
  };

  // Fonction pour valider le mot de passe
  const validatePassword = (
    password: string,
    setPasswordValid: (valid: boolean) => void
  ) => {
    const isValid = password.length >= 8;
    setPasswordValid(isValid);
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (user === null) {
        throw new Error("User is not authenticated");
      }

      const credentials = EmailAuthProvider.credential(
        user.email!, // Nous pouvons toujours utiliser l'opérateur d'affirmation non-null ici, car nous avons vérifié que user n'est pas null
        currentPassword
      );

      await reauthenticateWithCredential(user, credentials);

      if (newPassword !== confirmPassword) {
        Toast.show(
          "Le nouveau mot de passe et sa confirmation ne correspondent pas.",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          }
        );
        return;
      }

      if (newPassword.length < 8) {
        Toast.show(
          "Le nouveau mot de passe doit comporter au moins 8 caractères.",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          }
        );
        return;
      }

      await updatePassword(user, newPassword);
      navigation.navigate("MonProfil");

      Toast.show("Les informations de connexion ont été mises à jour.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error) {
        const { code } = error as { code: string };
        var toastMessage = "";

        // Gestion d'erreur spécifique pour un mot de passe invalide
        if (code === "auth/wrong-password") {
          toastMessage = "Le mot de passe actuel est incorrect.";
        } else {
          toastMessage =
            "Erreur lors de la mise à jour des informations de connexion.";
        }

        // Afficher le message d'erreur en utilisant Toast
        Toast.show(toastMessage, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      } else {
        console.error("Erreur non prévue:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="rgba(0,0,0,1)" /> */}
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
            {/* <TextInput
              placeholder="Mot de passe actuel"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputMdpActu}
              onChangeText={setCurrentPassword}
              value={currentPassword}
              onFocus={() => handleFocus("currentPassword")}
            ></TextInput> */}

            <TextInput
              placeholder="Mot de passe actuel"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={[
                styles.inputMdpActu,
                activeInput === "currentPassword" && styles.activeInput,
                isCurrentPasswordValid && styles.inputValid,
              ]}
              onChangeText={(text) => {
                setCurrentPassword(text);
                validatePassword(text, setIsCurrentPasswordValid);
              }}
              value={currentPassword}
              onFocus={() => handleFocus("currentPassword")}
            ></TextInput>
          </View>
          <View style={styles.groupMdpNew}>
            <Text style={styles.nouveauMotDePasse}>Nouveau mot de passe</Text>

            {/* <TextInput
              placeholder="Nouveau mot de passe (8 caractères et + )"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputMdpNew}
              onChangeText={setNewPassword}
              value={newPassword}
              onFocus={() => handleFocus("currentPassword")}
            ></TextInput> */}

            <TextInput
              placeholder="Nouveau mot de passe (8 caractères et + )"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={[
                styles.inputMdpNew,
                activeInput === "newPassword" && styles.activeInput,
                isNewPasswordValid && styles.inputValid,
              ]}
              onChangeText={(text) => {
                setNewPassword(text);
                validatePassword(text, setIsNewPasswordValid);
              }}
              value={newPassword}
              onFocus={() => handleFocus("newPassword")}
            ></TextInput>
          </View>
          <View style={styles.groupMdpConfirm}>
            <Text style={styles.nouveauMotDePasse1}>
              Confirmez le mot de passe
            </Text>

            {/* <TextInput
              placeholder="Confirmez le nouveau mot de passe"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputMdpConfirm}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              onFocus={() => handleFocus("currentPassword")}
            ></TextInput> */}

            <TextInput
              placeholder="Confirmez le nouveau mot de passe"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={[
                styles.inputMdpConfirm,
                activeInput === "confirmPassword" && styles.activeInput,
                isConfirmPasswordValid && styles.inputValid,
              ]}
              onChangeText={(text) => {
                setConfirmPassword(text);
                validatePassword(text, setIsConfirmPasswordValid);
              }}
              value={confirmPassword}
              onFocus={() => handleFocus("confirmPassword")}
            ></TextInput>
          </View>

          <View style={styles.groupSauvegarder}>
            <TouchableOpacity
              onPress={handleSave}
              style={styles.buttonSauvegarder}
            >
              <Text style={styles.sauvegarder}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
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

  activeInput: {
    borderColor: "#6f78bd",
  },

  inputValid: {
    backgroundColor: "#fffac3",
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
