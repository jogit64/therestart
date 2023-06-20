// LoadingSpinner.tsx

import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>Chargement...respire...</Text>
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
