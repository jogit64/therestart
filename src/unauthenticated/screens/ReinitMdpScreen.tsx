import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Feather";
import { useHardwareBackButton } from "components/useHardwareBackButton";
import { StatusBarCustom } from "components/StatusBarCustom";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../utils/navigationTypes";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

type ReinitMdpProps = {
  navigation: StackNavigationProp<RootStackParamList, "ReinitMdp">;
};

const ReinitMdp: React.FC<ReinitMdpProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Email envoyé",
          "Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe."
        );
      })
      .catch((error) => {
        Alert.alert("Erreur", error.message);
      });
  };

  useHardwareBackButton();

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="rgba(0,0,0,1)" /> */}
      <StatusBarCustom />
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
      <Text style={styles.titreReinitMdp}>Réinitialiser le mot de passe</Text>
      <Text style={styles.sousTitre}>
        Vous receverez un lien par e-mail pour réinitialiser votre mot de passe
      </Text>
      <Text style={styles.labelEmail}>Email</Text>

      <TextInput
        placeholder="Entrez une adresse email valide"
        placeholderTextColor="rgba(151,155,180,1)"
        inlineImagePadding={0}
        style={styles.inputEmail}
        onChangeText={(text) => setEmail(text)}
        value={email}
      ></TextInput>
      <TouchableOpacity
        style={styles.buttonEnvoyer}
        onPress={handleResetPassword}
      >
        <Text style={styles.textEnvoyer}>Envoyer</Text>
      </TouchableOpacity>
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
    marginTop: 46,
    marginLeft: 19,
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
  titreReinitMdp: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    //letterSpacing: 1.5,
    marginTop: 57,
    //marginLeft: 54,
    alignSelf: "center",
  },
  sousTitre: {
    fontFamily: "roboto",
    color: "rgba(152,156,183,1)",
    textAlign: "center",
    fontSize: 14,
    marginTop: 9,
    marginLeft: 50,
    marginRight: 50,
  },
  labelEmail: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 14,
    //textAlign: "left",
    marginTop: 43,
    marginLeft: 47,
  },
  inputEmail: {
    fontFamily: "roboto",
    color: "#121212",
    height: 55,
    width: 260,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 11,
    marginLeft: 50,
    paddingLeft: 10,
  },
  buttonEnvoyer: {
    width: 260,
    height: 55,
    backgroundColor: "#dcdeeb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 20,
    marginTop: 19,
    marginLeft: 50,
    marginRight: 50,
  },
  textEnvoyer: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "roboto",
  },
});

export default ReinitMdp;
