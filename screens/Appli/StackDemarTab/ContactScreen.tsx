import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ContactScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contactez-nous</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default ContactScreen;