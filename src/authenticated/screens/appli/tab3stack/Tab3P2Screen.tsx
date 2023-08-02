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
        <View style={styles.seedContainer}>
          <Image
            source={require("./../../../../../assets/images/logoReStart.png")}
            style={{ width: 35, height: 35 }}
          />
          {/* <Text style={styles.title}>Perspectives!</Text> */}
        </View>

        {/* <ImageBackground
          source={require("./../../../../../assets/images/fronton.png")}
          style={styles.frontonImage}
          resizeMode="cover"
        ></ImageBackground> */}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  seedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 15,
    flexWrap: "wrap",
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
