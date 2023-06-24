import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { useHardwareBackButton } from "components/useHardwareBackButton";
import { FontAwesome } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tab1ParamList } from "../../../../../utils/navigationTypes";

type FaqScreenNavigationProp = StackNavigationProp<Tab1ParamList, "Faq">;

export default function FaqScreen() {
  useHardwareBackButton();
  const navigation = useNavigation<FaqScreenNavigationProp>();
  return (
    <View style={styles.container}>
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
      </View>
      <Text style={styles.infosPersonnelles}>FAQ</Text>
      <FontAwesome name="question-circle" size={35} style={styles.wrench} />
      <Text style={styles.header}>
        Nous construisons quelque chose de génial !
      </Text>
      <Text style={styles.text}>
        Cet écran est actuellement en cours de réalisation. Nous travaillons dur
        pour vous apporter une nouvelle fonctionnalité qui améliorera votre
        expérience.
      </Text>
      <Text style={styles.text}>
        Merci pour votre patience et votre compréhension.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // même styles que TutorielScreen

  container: {
    flex: 1,
    backgroundColor: "rgba(236,246,255,1)",
    paddingHorizontal: 20, // ajout d'une marge pour éviter le texte trop près du bord de l'écran
  },
  goBackButtonRow: {
    height: 35,
    flexDirection: "row",
    marginTop: 46,
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#4F8EF7",

    marginBottom: 50,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    margin: 10,
    color: "#333",
  },
  infosPersonnelles: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    marginLeft: 32,
    marginTop: 20,
  },

  // infosPersonnelles: {
  //   fontFamily: "roboto700",
  //   color: "rgba(50,56,106,1)",
  //   fontSize: 20,
  //   marginTop: 15,
  //   textAlign: "center",
  // },

  wrench: {
    color: "#4F8EF7",
    marginTop: 100,
    textAlign: "center",
    marginBottom: 15,
  },
});
