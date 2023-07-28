import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useHardwareBackButton } from "components/useHardwareBackButton";

export default function Tab3P1Screen({ route }) {
  const { selectedItemsPhrases } = route.params;

  return (
    <View style={styles.container}>
      {selectedItemsPhrases.map((phrase, index) => (
        <Text key={index} style={styles.text}>
          {phrase}
        </Text>
      ))}
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
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
