import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialButtonSuccess(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.emotions}>Emotions</Text>
      <MaterialCommunityIconsIcon
        name="heart-multiple"
        style={styles.icon}
      ></MaterialCommunityIconsIcon>
      <View style={styles.rect}></View>
      <MaterialCommunityIconsIcon
        name="heart-multiple"
        style={styles.icon2}
      ></MaterialCommunityIconsIcon>
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
  emotions: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "roboto",
    marginTop: 33,
    paddingTop: 10,
  },
  icon: {
    top: 12,
    left: -677,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 38,
  },
  rect: {},
  icon2: {
    top: 12,
    left: 31,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 38,
  },
});

export default MaterialButtonSuccess;
