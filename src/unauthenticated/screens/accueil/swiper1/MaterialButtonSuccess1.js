import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function MaterialButtonSuccess1(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.croyances}>Croyances</Text>
      <Icon name="database" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009688",
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
  croyances: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "roboto",
    marginTop: 33,
    paddingTop: 10,
  },
  icon: {
    top: 13,
    left: 34,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 35,
  },
});

export default MaterialButtonSuccess1;
