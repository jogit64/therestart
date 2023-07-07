import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import luckyDiceAnimation from "../../../../../assets/animations/lucky-dice.json";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Tab2() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Contenu de votre ScrollView</Text>
        {/* Ajoutez ici le reste de votre contenu qui sera dans le ScrollView */}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Settings")}
        >
          <LottieView
            source={luckyDiceAnimation}
            autoPlay
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => console.log("Icone Cog pressée")}
        >
          <Icon name="cog" size={50} color="#000" />
          {/* Vous pouvez changer la taille et la couleur de l'icône ici */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 0.75,
    backgroundColor: "#f5f5f5", // Changer la couleur de fond si nécessaire
  },
  bottomBar: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ddd", // Changer la couleur de fond si nécessaire
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
});
