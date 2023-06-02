import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialButtonPurple(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.pensees}>Pensées</Text>
      <Icon name="thought-bubble" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#673AB7",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },
  pensees: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "roboto700",
    marginTop: 33,
    paddingTop: 10,
  },
  icon: {
    top: 14,
    left: 31,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 42,
  },
});

export default MaterialButtonPurple;
