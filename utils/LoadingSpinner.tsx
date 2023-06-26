import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingSpinner = ({
  spinnerColor = "#0000ff",
  largeSpinner = true,
  loadingText = "Chargement..",
}) => (
  <View style={styles.container}>
    <ActivityIndicator
      size={largeSpinner ? "large" : "small"}
      color={spinnerColor}
    />
    <Text style={styles.loadingText}>{loadingText}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default LoadingSpinner;
