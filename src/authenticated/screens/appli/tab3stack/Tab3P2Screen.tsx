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
          <Text style={styles.title}>Perspectives!</Text>
        </View>

        <View style={styles.affirmContainer}>
          {selectedItemsPhrases.map((phrase, index) => (
            <Text key={index} style={styles.textAffirm}>
              {phrase}
            </Text>
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
  textAffirm: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },
});
