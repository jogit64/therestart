import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useHardwareBackButton } from "components/useHardwareBackButton";

export default function Tab3P2Screen({ route }) {
  const { selectedItemsPhrases } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.firstPartContainer}>
          <Text style={styles.title}>Phrases suggérées</Text>
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
    // flex: 1,
    // flexDirection: "row", // Ajoutez cette ligne
    // alignItems: "center", // Centrez les éléments verticalement
    paddingHorizontal: 20,
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
    fontSize: 24,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingBottom: 20, // Ajout d'un espace en bas pour ne pas que le titre colle aux phrases
  },
});
