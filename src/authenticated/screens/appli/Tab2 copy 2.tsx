import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";

import rondBleuAnimation from "./../../../../assets/animations/rondbleu.json";
import rondVertAnimation from "./../../../../assets/animations/rondvert.json";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "../../../../utils/navigationTypes";

export default function Tab2() {
  //const navigation = useNavigation();
  const navigation = useNavigation<StackNavigationProp<TabParamList, "Tab2">>();

  //const firstName = "utilisateur"; // Utilisez le prénom de l'utilisateur ici

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.seedContainer}>
          <Image
            source={require("./../../../../assets/images/logoReStart.png")}
            style={{ width: 50, height: 50 }} // ajustez la taille de l'image selon vos besoins
          />
        </View>
        <Text style={styles.title}>Cultivez vos graines de joie !</Text>
        {/* <View style={styles.seedContainer}>
          <MaterialCommunityIcons
            name="seed"
            size={10}
            color="rgba(151,155,180,1)"
          />
          <MaterialCommunityIcons
            name="seed"
            size={10}
            color="rgba(151,155,180,1)"
          />
          <MaterialCommunityIcons
            name="seed"
            size={10}
            color="rgba(151,155,180,1)"
          />
        </View> */}

        <View style={styles.blocContainer}>
          <Text style={styles.sstitle}>Revivez vos moments magiques</Text>
          <Text style={styles.textIntro}>
            Cliquez ici pour faire revivre aléatoirement vos précieux souvenirs.
            Laissez-vous emporter par les sentiments de joie et d'émerveillement
            qu'ils suscitent, comme si vous les viviez de nouveau.
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.lottieButton}
              onPress={() => navigation.navigate("ScreenRandomMemory")}
            >
              <LottieView
                source={rondBleuAnimation}
                autoPlay
                style={styles.animation}
              />
              <MaterialCommunityIcons
                name="watering-can-outline"
                size={40}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.interblocContainer}>
          <Text style={styles.sstitle}>Quelques principes</Text>
          <Text style={styles.textPar}>
            Les émotions positives sont bénéfiques pour votre santé et votre
            bien-être. En vous concentrant sur les aspects joyeux de la vie
            plutôt que sur les aspects négatifs ou pessimistes, vous pouvez
            améliorer votre qualité de vie.
          </Text>
        </View>

        <View style={styles.blocContainer}>
          <Text style={styles.sstitle}>Plantez vos graines d'enchantement</Text>
          <Text style={styles.textIntro}>
            N'avez-vous pas encore planté vos graines de joie ? Ces graines sont
            vos souvenirs d'enfance, empreints de magie et d'insouciance.
            Ajoutez-les à votre jardin personnel et regardez-les grandir chaque
            fois que vous les visitez.
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.lottieButton}
              onPress={() => navigation.navigate("ScreenManageMemory")}
            >
              <LottieView
                source={rondVertAnimation}
                autoPlay
                style={styles.animation}
              />
              <MaterialCommunityIcons name="shovel" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    //alignItems: "center",
    padding: 20,
  },
  lottieButton: {
    //width: "100%",
    //height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    position: "absolute",
    width: 250,
    height: 250,
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "roboto",
    color: "#ffffff",
  },
  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "rgba(50,56,106,1)",
  },
  sstitle: {
    fontFamily: "roboto500",
    fontSize: 20,
    textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
  },
  textIntro: {
    fontFamily: "roboto",
    //color: "rgba(151,155,180,1)",
    color: "rgba(50,56,106,1)",
    textAlign: "center",
    lineHeight: 20,
    fontSize: 14,
    marginVertical: 5,
  },

  textPar: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    //textAlign: "center",
    lineHeight: 20,
    fontSize: 14,
    marginVertical: 10,
  },

  seedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    //marginTop: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: 65,
    marginTop: 25,
  },
  interblocContainer: {
    marginBottom: 65,
    marginTop: 25,
  },
  blocContainer: {
    backgroundColor: "#c3d9e4", // utilisation de l'une des couleurs de votre palette
    marginBottom: 35,
    paddingBottom: 50,
    paddingTop: 20,
    borderRadius: 10, // arrondit les coins du bloc
    shadowColor: "#000", // définit la couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // décale l'ombre horizontalement et verticalement
    shadowOpacity: 0.2, // contrôle la transparence de l'ombre
    shadowRadius: 2, // contrôle la flou de l'ombre
    elevation: 5, // ajoute une ombre pour Android
    padding: 15, // ajoute une marge interne pour donner un peu d'espace au contenu
  },
});
