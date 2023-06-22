// Importation des dépendances nécessaires
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useHardwareBackButton } from "components/useHardwareBackButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getDoc, deleteDoc, doc, getFirestore } from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../utils/navigationTypes";

type MonProfilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MonProfil"
>;

// Initialisation de la base de données Firebase
const db = getFirestore();

// Cette fonction supprime le compte d'un utilisateur
const deleteAccount = async (
  password: string,
  navigation: MonProfilScreenNavigationProp
) => {
  // On récupère l'instance d'authentification et l'utilisateur courant
  const auth = getAuth();
  const user = auth.currentUser;

  // Si un utilisateur est connecté, on continue
  if (user) {
    // On demande une confirmation à l'utilisateur avant de supprimer son compte
    Alert.alert(
      "Confirmation de suppression",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        // L'utilisateur peut annuler la suppression
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            // On crée des informations d'identification avec l'email et le mot de passe de l'utilisateur
            if (user.email === null) {
              console.error(
                "Failed to delete user account. User email is null."
              );
              return;
            }

            const credential = EmailAuthProvider.credential(
              user.email,
              password
            );

            try {
              // On essaye de ré-authentifier l'utilisateur
              await reauthenticateWithCredential(user, credential);
            } catch (error: unknown) {
              if (
                typeof error === "object" &&
                error !== null &&
                "code" in error &&
                "message" in error
              ) {
                const { code } = error as { code: string; message: string };
                console.error("Failed to re-authenticate user.", error);

                // On vérifie si le mot de passe était incorrect
                if (code === "auth/wrong-password") {
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
              }
              return;
            }

            // On essaye de supprimer le document de l'utilisateur dans la base de données
            const userDocRef = doc(db, "users", user.uid);
            try {
              await deleteDoc(userDocRef);
            } catch (error) {
              console.error("Failed to delete user document.", error);
            }

            // On essaye de supprimer le compte de l'utilisateur
            try {
              await user.delete();
            } catch (error) {
              console.error("Failed to delete user account.", error);
            }

            // On informe l'utilisateur que son compte a été supprimé et on le redirige vers la page de connexion
            Alert.alert(
              "Compte supprimé",
              "Votre compte a été supprimé avec succès.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("Login"),
                },
              ]
            );
          },
        },
      ]
    );
  }
};

// Le composant MonProfilScreen permet à l'utilisateur de gérer son profil
export default function MonProfilScreen() {
  // État pour le mot de passe et sa validité
  const [password, setPassword] = useState("");
  const [isPasswordValid, setisPasswordValid] = useState(false);

  // État pour la visibilité du mot de passe
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  // Utilisation du hook useHardwareBackButton pour gérer le bouton retour du matériel
  useHardwareBackButton();

  const navigation = useNavigation<MonProfilScreenNavigationProp>();

  // Cette fonction est appelée chaque fois que le mot de passe change
  const handlePasswordChange = (password: string) => {
    setPassword(password);
    validatePassword(password);
  };

  // Styles pour l'entrée et le bouton qui changent en fonction de la validité du mot de passe
  const inputStyle = {
    ...styles.input,
    borderColor: isPasswordValid ? "#6f78bd" : "rgba(220,222,235,1)",
  };
  const buttonStyle = {
    ...styles.buttonSupprimer,
    backgroundColor: isPasswordValid ? "#e95120" : "#dcdeeb",
  };
  const buttonTextStyle = isPasswordValid
    ? styles.activeButtonText
    : styles.buttonText;

  // Cette fonction vérifie si le mot de passe est valide ou non
  const validatePassword = (password: string) => {
    const isValid = password.length >= 8;
    setisPasswordValid(isValid);
  };

  // Effet pour valider le mot de passe chaque fois qu'il change
  useEffect(() => {
    validatePassword(password);
  }, [password]);

  // Rendu du composant

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,1)" />

      {/* Go back button and profile title */}
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
            <FeatherIcon name="chevron-left" style={styles.iconGoBack} />
          </View>
        </TouchableOpacity>
        <Text style={styles.monProfil6}>Mon profil</Text>
      </View>

      <View style={styles.lignPolitique}></View>

      {/* Infos personnelles button */}
      <TouchableOpacity
        style={styles.buttonInfosPerso}
        onPress={() => navigation.navigate("InfosPerso")}
      >
        <Text style={styles.infosPersonnelles}>Infos personnelles</Text>
        <View style={styles.infosPersonnellesFiller}></View>
        <FeatherIcon name="chevron-right" style={styles.chevronInfosPerso} />
      </TouchableOpacity>

      {/* Connexion et sécurité button */}
      <TouchableOpacity
        style={styles.buttonSecu}
        onPress={() => navigation.navigate("ChangePassword")}
      >
        <View style={styles.lignInfo}></View>
        <View style={styles.nousSecuRow}>
          <Text style={styles.nousSecu}>Connexion et sécurité</Text>
          <View style={styles.nousSecuFiller}></View>
          <FeatherIcon name="chevron-right" style={styles.chevronContact} />
        </View>
      </TouchableOpacity>

      <Text style={styles.titreSuppr}>Supprimer mon compte</Text>
      <Text style={styles.infoMessage}>
        Pour supprimer votre compte, veuillez renseigner votre mot de passe.
      </Text>

      {/* Password input */}
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

      {/* Supprimer mon compte button */}
      <View style={{ alignSelf: "center" }}>
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
