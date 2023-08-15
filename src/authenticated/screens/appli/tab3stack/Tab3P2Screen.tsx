import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useHardwareBackButton } from "components/useHardwareBackButton";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tab3ParamList } from "../../../../../utils/navigationTypes";

export default function Tab3P2Screen({ route }) {
  const navigation =
    useNavigation<StackNavigationProp<Tab3ParamList, "Tab3P0">>();
  const { selectedItemsPhrases } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.firstPartContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Tab3P1a")}>
            <View style={styles.backButtonContainer}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#000"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.titleScreen}>Pratiquez</Text>
        </View>

        <View style={styles.secondPartContainer}>
          <Text style={styles.intro}>Comment pratiquer ?</Text>
          <View style={styles.instruction}>
            <Text style={styles.number}>1.</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Confrontez votre pensée initiale</Text>{" "}
              avec les phrases proposées. Ces phrases visent à élargir votre
              perspective, à remettre en question la validité de votre croyance
              initiale.
            </Text>
          </View>
          <View style={styles.instruction}>
            <Text style={styles.number}>2.</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>
                Immergez-vous dans la nouvelle perspective
              </Text>
              . Prenez un moment pour vraiment vous installer dans cette
              nouvelle vision des choses que la phrase suggère. Efforcez-vous de
              maintenir et d'approfondir cette représentation, en la laissant
              éclipser votre croyance initiale. Accordez-vous le temps
              nécessaire pour ressentir pleinement les nuances, la complexité et
              l'incertitude que cette perspective apporte.
            </Text>
          </View>
          <View style={styles.instruction}>
            <Text style={styles.number}>3.</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Retournez à votre pensée initiale</Text>
              . Après avoir médité sur ces phrases, repensez à votre pensée
              perturbatrice originale. Si l'émotion reste vive, répétez le
              processus. L'idée est d'itérer jusqu'à ce que la charge
              émotionnelle diminue.
            </Text>
          </View>
          <View style={styles.instruction}>
            <Text style={styles.number}>4.</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Évaluez vos sentiments</Text>.
              L'objectif est d'arriver à un point où votre pensée initiale
              semble moins chargée, voire neutre. Si ce n'est pas le cas,
              n'hésitez pas à recommencer le processus ou à chercher d'autres
              phrases qui résonnent davantage avec vous.
            </Text>
          </View>
        </View>

        <View style={styles.affirmContainer}>
          {selectedItemsPhrases.map((phrase, index) => (
            <View key={index} style={styles.phraseContainer}>
              <Text style={styles.textAffirm}>{phrase}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    //paddingHorizontal: 20,
    paddingTop: 50,
    //marginTop: 35,
  },

  firstPartContainer: {
    flex: 1,
    flexDirection: "row", // Ajoutez cette ligne
    alignItems: "center", // Centrez les éléments verticalement
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  titleScreen: {
    fontFamily: "roboto700",
    fontSize: 22,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
    //  marginBottom: 15,
  },

  backButtonContainer: {
    width: 40, // Taille du cercle
    height: 40,
    borderRadius: 20, // Arrondi pour rendre le cercle parfait
    backgroundColor: "#f5f6fa",
    justifyContent: "center", // Centrez l'icône horizontalement
    alignItems: "center", // Centrez l'icône verticalement
    marginRight: 15, // Espace entre le bouton et le texte
  },

  secondPartContainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },

  intro: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  instruction: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    flexDirection: "row",
    marginBottom: 8,
  },
  number: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    flex: 1,
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
  },
  bold: {
    fontWeight: "bold",
  },

  affirmContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 50,
    marginBottom: 15,
    //flexWrap: "wrap",
  },
  // textAffirm: {
  //   fontFamily: "roboto",
  //   color: "rgba(151,155,180,1)",
  //   lineHeight: 25,
  //   paddingHorizontal: 10,
  //   fontSize: 16,
  // },

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  // title: {
  //   fontFamily: "roboto700",
  //   fontSize: 24,
  //   textAlign: "center",
  //   color: "rgba(50,56,106,1)",
  //   paddingLeft: 10,
  // },
  phraseContainer: {
    backgroundColor: "#f6f6f6", // Un fond légèrement gris
    borderRadius: 10, // Coins arrondis
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 20,
    shadowColor: "#000", // Ombre
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textAffirm: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)", // couleur plus foncée pour contraster avec le fond clair
    lineHeight: 25,
    fontSize: 16,
  },

  title: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 20, // Ajout d'un espace en bas pour ne pas que le titre colle aux phrases
  },
});
