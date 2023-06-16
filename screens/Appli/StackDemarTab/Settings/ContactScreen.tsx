import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Feather";
import { useHardwareBackButton } from "../../../../components/useHardwareBackButton";

export default function ContactScreen({ navigation }) {
  useHardwareBackButton();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,1)" />
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.goBackButtonRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackButton}
            >
              <View style={styles.ellipseGoBackStack}>
                <Svg viewBox="0 0 28.06 28.06" style={styles.ellipseGoBack}>
                  <Ellipse
                    stroke="rgba(230, 230, 230,1)"
                    strokeWidth={0}
                    fill="rgba(255,255,255,1)"
                    cx={14}
                    cy={14}
                    rx={14}
                    ry={14}
                  ></Ellipse>
                </Svg>
                <Icon name="chevron-left" style={styles.iconGoBack}></Icon>
              </View>
            </TouchableOpacity>
            <Text style={styles.nousContacter}>Nous contacter</Text>
          </View>
          <View style={styles.groupSujet}>
            <Text style={styles.sujet}>Sujet</Text>
            <TextInput
              placeholder="Entrez votre nom d'utilisateur"
              dataDetector="address"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputSujet}
            ></TextInput>
          </View>
          <View style={styles.groupMessage}>
            <Text style={styles.message}>Message</Text>
            <TextInput
              placeholder="Entrez votre message ici - entre 10 et 400 caractères"
              dataDetector="none"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              textBreakStrategy="simple"
              clearTextOnFocus={false}
              multiline={true}
              selectTextOnFocus={true}
              style={styles.inputMessage}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("MonProfil")}
            style={styles.groupSauvegarder}
          >
            <TouchableOpacity style={styles.buttonSauvegarder}>
              <Text style={styles.sauvegarder}>Sauvegarder</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,246,255,1)",
  },
  scrollArea: {
    width: 360,
    height: 789,
    marginTop: 22,
  },
  scrollArea_contentContainerStyle: {
    height: 789,
    width: 360,
  },
  goBackButton: {
    width: 32,
    height: 35,
  },
  ellipseGoBack: {
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    position: "absolute",
  },
  iconGoBack: {
    top: 2,
    left: 0,
    position: "absolute",
    color: "rgba(113,119,181,1)",
    fontSize: 26,
  },
  ellipseGoBackStack: {
    width: 28,
    height: 28,
    marginTop: 2,
    marginLeft: 4,
  },
  nousContacter: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    marginLeft: 54,
    marginTop: 24,
  },
  goBackButtonRow: {
    height: 46,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 19,
    marginRight: 131,
  },
  groupSujet: {
    width: 298,
    height: 70,
    marginTop: 30,
    marginLeft: 30,
  },
  sujet: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputSujet: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 8,
    alignSelf: "center",
    paddingLeft: 10,
  },
  groupMessage: {
    width: 302,
    height: 69,
    marginTop: 29,
    marginLeft: 30,
  },
  message: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputMessage: {
    fontFamily: "roboto",
    color: "#121212",
    height: null, // change this
    minHeight: 295, // add this
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    marginLeft: 2,
    paddingLeft: 10,
  },

  groupSauvegarder: {
    width: 290,
    height: 57,
    overflow: "visible",
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 275,
    marginLeft: 35,
  },
  buttonSauvegarder: {
    width: 290,
    height: 55,
    backgroundColor: "rgba(111,120,189,1)",
    borderRadius: 11,
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 3,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sauvegarder: {
    fontFamily: "roboto500",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    textAlign: "center",
  },
});
