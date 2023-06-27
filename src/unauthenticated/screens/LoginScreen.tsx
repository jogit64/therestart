import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { authStyles } from "../styles/authStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect, useContext } from "react";

import { auth } from "../../../utils/firebase.js"; // Importez auth depuis firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import Toast from "react-native-root-toast";

import UserContext from "../../../utils/UserContext"; // Import du UserContext

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../utils/navigationTypes";

const LoginScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext)!; // Ajout de setUser depuis le UserContext

  const handleLogin = async () => {
    Keyboard.dismiss(); // ferme le clavier
    try {
      setIsLoading(true); // démarre l'indicateur de chargement

      await signInWithEmailAndPassword(auth, email, password);
      //      navigation.navigate("BottomTabNavigator", { screen: "Tab1Home" });
      //      navigation.navigate("Accueil", { screen: "Tab1Home" });
      //navigation.navigate("BottomTabNavigator", { screen: "Accueil" });

      // Récupérer les informations sur l'utilisateur à partir de Firestore
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        // Mettre à jour les données de l'utilisateur dans le contexte
        const userData = userDocSnap.data();
        if (userData) {
          console.log(userData);
          setUser({
            basicInfo: {
              //firstName: userData.firstName || "",
              firstName: userData.basicInfo.firstName || "",
              email: user.email || "",
            },
            extraInfo: {
              isLoggedIn: true,
              imageUrl: userData.imageUrl || null,
              age: userData.age || null,
              sex: userData.sex || null,
            },
          });
          navigation.navigate("BottomTabNavigator", { screen: "Accueil" });
        }
      } else {
        // cas impossible car l'utilisateur vient d'être authentifié avec succès
      }
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "message" in error
      ) {
        const { code, message } = error as { code: string; message: string };
        var toastMessage = "";

        // Gestion d'erreur spécifique pour un email non trouvé
        if (code === "auth/user-not-found") {
          toastMessage =
            "Il n'y a pas d'utilisateur correspondant à cet identifiant. L'utilisateur peut avoir été supprimé.";
        }
        // Gestion d'erreur pour un mot de passe invalide
        else if (code === "auth/wrong-password") {
          toastMessage =
            "Le mot de passe est invalide\nou l'utilisateur n'a pas de mot de passe.";
        }
        // Gestion d'erreur pour un e-mail invalide
        else if (code === "auth/invalid-email") {
          toastMessage = "L'adresse e-mail n'est pas valide.";
        }
        // Gestion d'erreur pour trop de tentatives de connexion
        else if (code === "auth/too-many-requests") {
          toastMessage =
            "L'accès à ce compte a été temporairement désactivé\nen raison de nombreuses tentatives de connexion échouées.\nVous pouvez le restaurer immédiatement en réinitialisant\nvotre mot de passe ou vous pouvez réessayer plus tard.";
        }

        // Afficher le message d'erreur en utilisant Toast
        Toast.show(toastMessage, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        console.error("Erreur lors de la connexion :", message);
      } else {
        console.error("Erreur lors de la connexion :", error);
      }
    }
    setIsLoading(false); // arrête l'indicateur de chargement
  };

  // Définition des états
  const [activeInput, setActiveInput] = useState("");
  const [isButtonActive, setButtonActive] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  //const [isFirstNameValid, setIsFirstNameValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  // Fonction pour gérer le focus sur les différents inputs
  // Elle réinitialise aussi l'état isInputValid à false lors du focus
  const handleFocus = (name: string) => {
    setActiveInput(name);
    setIsInputValid(false);
  };

  // Fonction pour valider le mot de passe
  // Elle vérifie si le mot de passe a au moins 8 caractères
  const validatePassword = (password: string) => {
    const isValid = password.length >= 8;

    if (isValid) {
      setPasswordError("");
      setIsPasswordValid(true);
    } else {
      setPasswordError("Le mot de passe doit comporter au moins 8 caractères");
      setIsPasswordValid(false);
    }
  };

  // Fonction pour valider l'email
  // Elle vérifie si l'email respecte le format correct
  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValid) {
      setEmailError("");
      setIsEmailValid(true);
    } else {
      setEmailError("Veuillez entrer une adresse e-mail valide");
      setIsEmailValid(false);
    }
  };

  useEffect(() => {
    setButtonActive(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  return (
    <View style={authStyles.container}>
      <ScrollView>
        <LinearGradient
          colors={["#e9f6ff", "#f8fcff"]}
          style={authStyles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          key="1"
        >
          <View style={authStyles.scrollViewContainer}>
            {/* // ! icone man haut */}
            <View style={authStyles.iconContainer}>
              <Icon name="login" style={authStyles.icon} />
            </View>

            {/* // ! titre Créer une cpte gratuit */}
            <Text style={authStyles.titrePrincipal}>
              Connectez-vous{"\n"}à votre compte
            </Text>

            {/* // ! label Email + INPUT */}
            <Text style={authStyles.label}>Email</Text>
            <TextInput
              placeholder="Entrez une adresse email valide"
              style={[
                authStyles.input,
                activeInput === "email" && authStyles.activeInput,
                isEmailValid ? authStyles.inputValid : null,
              ]}
              onFocus={() => handleFocus("email")}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
              value={email}
            />

            {emailError ? (
              <Text style={authStyles.errorText}>{emailError}</Text>
            ) : null}

            {/* // ! label Mot de passe + INPUT */}
            <Text style={authStyles.label}>Mot de passe</Text>
            <View style={authStyles.passwordContainer}>
              <TextInput
                placeholder="Mot de passe (8 caractères et +)"
                style={[
                  authStyles.input,
                  activeInput === "password" && authStyles.activeInput,
                  isPasswordValid && authStyles.inputValid,
                ]}
                secureTextEntry={!isPasswordVisible}
                onFocus={() => handleFocus("password")}
                onChangeText={(text) => {
                  setPassword(text);
                  validatePassword(text);
                }}
                value={password}
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setPasswordVisibility(!isPasswordVisible)}
              >
                <Icon
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={authStyles.errorText}>{passwordError}</Text>
            ) : null}

            {/* // ! Mot de passe oublié  ?*/}
            <View>
              <Text style={authStyles.passForgot}>Mot de passe oublié ?</Text>
            </View>

            {/* // ! bouton Créer un cpte gratuit */}
            {/* {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null} */}
            <TouchableOpacity
              style={[
                authStyles.buttonCreer,
                isButtonActive ? authStyles.buttonActive : null,
              ]}
              onPress={handleLogin}
            >
              <Text style={authStyles.buttonText}>Me connecter</Text>
            </TouchableOpacity>

            {/* // ! text Pas de cpte  ?*/}
            <View>
              <Text style={authStyles.textDeja}>Pas de compte ?</Text>
            </View>

            {/* // ! lien Inscrivez-vous */}
            <View>
              <Text
                style={authStyles.meConnecter}
                onPress={() => navigation.navigate("SignUp")}
              >
                Inscrivez-vous
              </Text>
            </View>

            {/* // ! text et liens CGU */}
            <TouchableOpacity>
              <Text style={authStyles.textCGU}>
                En vous connectant, vous acceptez nos{"\n"}
                <Text style={authStyles.linkText}>
                  conditions générales
                </Text> et{" "}
                <Text
                  style={authStyles.linkText}
                  onPress={() => navigation.navigate("Politique")}
                >
                  politique de confidentialité
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
      {isLoading ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
    </View>
  );
};

export default LoginScreen;
