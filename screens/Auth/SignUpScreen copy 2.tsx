import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
} from "react-native";
import { authStyles } from "./authStyles";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect, useContext } from "react";

import { auth } from "../../firebase.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
//import Toast from "react-native-toast-message";
import Toast from "react-native-root-toast";

import UserContext from "../../UserContext"; // Import du UserContext

const SignUpScreen = ({ navigation }) => {
  // Définition des états
  const [activeInput, setActiveInput] = useState("");
  const [isButtonActive, setButtonActive] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(""); // Renommé en firstNameInput

  const { setFirstName } = useContext(UserContext);

  // ! Fonction pour gérer le focus sur les différents inputs
  // Elle réinitialise aussi l'état isInputValid à false lors du focus
  const handleFocus = (name) => {
    setActiveInput(name);
    setIsInputValid(false);
  };
  //  ! Fonction pour valider le mot de passe
  // Elle vérifie si le mot de passe a au moins 8 caractères
  const validatePassword = (password) => {
    const isValid = password.length >= 8;

    if (isValid) {
      setPasswordError("");
      setIsPasswordValid(true);
    } else {
      setPasswordError("Le mot de passe doit comporter au moins 6 caractères");
      setIsPasswordValid(false);
    }
  };

  // ! Fonction pour valider l'email
  // Elle vérifie si l'email respecte le format correct
  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValid) {
      setEmailError("");
      setIsEmailValid(true);
    } else {
      setEmailError("Veuillez entrer une adresse e-mail valide");
      setIsEmailValid(false);
    }
  };

  // ! Fonction pour valider le prénom
  // Elle vérifie si le prénom est non vide
  const validateFirstName = (firstName) => {
    const isValid = firstName !== "";

    if (isValid) {
      setIsFirstNameValid(true);
      setFirstNameInput(firstName); // Mettre à jour firstNameInput avec la valeur saisie par l'utilisateur
    } else {
      setIsFirstNameValid(false);
    }
  };

  // Effect pour mettre à jour l'état isButtonActive chaque fois que l'état de validation des champs est modifié
  useEffect(() => {
    setButtonActive(isEmailValid && isPasswordValid && isFirstNameValid);
  }, [isEmailValid, isPasswordValid, isFirstNameValid]);

  const db = getFirestore();

  // Fonction pour gérer l'inscription de l'utilisateur
  const handleRegister = async () => {
    // Fermer le clavier
    Keyboard.dismiss();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered successfully!", user);

      // Enregistrer le prénom de l'utilisateur dans Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { firstName: firstNameInput });

      // Mettre à jour le contexte de l'utilisateur
      setFirstName(firstNameInput);

      // Redirige vers BottomTabNavigator.
      //navigation.navigate("BottomTabNavigator");
      navigation.navigate("AppNavigator");
      //navigation.navigate("HomeTab");
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Failed to register user.", errorCode, errorMessage);

      // Message par défaut
      let toastMessage = errorMessage;

      // Gestion d'erreur spécifique pour un email déjà utilisé
      if (errorCode === "auth/email-already-in-use") {
        toastMessage =
          "Cette adresse e-mail est déjà utilisée.\nVeuillez aller sur l'écran Me connecter.";
      }
      // Gestion d'erreur pour un mot de passe invalide
      else if (errorCode === "auth/weak-password") {
        toastMessage = "Le mot de passe est trop faible.";
      }
      // Gestion d'erreur pour un e-mail invalide
      else if (errorCode === "auth/invalid-email") {
        toastMessage = "L'adresse e-mail n'est pas valide.";
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
    }
  };

  return (
    <View style={authStyles.container}>
      <ScrollView style={authStyles.scrollView}>
        <LinearGradient
          //colors={["yellow", "#f8fcff"]}
          colors={["#e9f6ff", "#f8fcff"]}
          style={authStyles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          key="1"
        >
          <View style={authStyles.scrollViewContainer}>
            {/* // ! icone man haut */}
            <View style={authStyles.iconContainer}>
              <Icon name="account" style={authStyles.icon} />
            </View>

            {/* // ! titre Créer une cpte gratuit */}
            <Text style={authStyles.titrePrincipal}>
              Créer un compte gratuit
            </Text>

            {/* // ! label Prénom + INPUT */}
            <Text style={authStyles.label}>Prénom</Text>

            <TextInput
              placeholder="Entrez un prénom / pseudo"
              style={[
                authStyles.input,
                activeInput === "firstName" && authStyles.activeInput,
                isFirstNameValid && authStyles.inputValid,
              ]}
              onFocus={() => handleFocus("firstName")}
              onChangeText={(text) => {
                validateFirstName(text);
              }}
            />

            {/* // ! label Email + INPUT */}
            <Text style={authStyles.label}>Email</Text>
            <TextInput
              placeholder="Entrez une adresse email valide"
              style={[
                authStyles.input,
                activeInput === "email" && authStyles.activeInput,
                isEmailValid && authStyles.inputValid,
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

            {/* // ! bouton Créer un cpte gratuit */}
            <TouchableOpacity
              style={[
                authStyles.buttonCreer,
                isButtonActive && authStyles.buttonActive,
              ]}
              onPress={handleRegister} // Utilisation de la fonction handleRegister ici
            >
              <Text style={authStyles.buttonText}>Créer un compte gratuit</Text>
            </TouchableOpacity>

            {/* // ! text Vous avez déjà un cpte */}
            <View>
              <Text style={authStyles.textDeja}>
                Vous avez déjà un compte ?
              </Text>
            </View>

            {/* // ! lien Me connecter */}
            <View>
              <Text
                style={authStyles.meConnecter}
                onPress={() => navigation.navigate("Login")}
              >
                Me connecter
              </Text>
            </View>

            {/* // ! text et liens CGU */}
            <TouchableOpacity onPress={() => navigation.navigate("CGU")}>
              <Text style={authStyles.textCGU}>
                En vous connectant, vous acceptez nos{"\n"}
                <Text
                  style={authStyles.linkText}
                  onPress={() => navigation.navigate("CGU")}
                >
                  conditions générales
                </Text>{" "}
                et{" "}
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
    </View>
  );
};

export default SignUpScreen;