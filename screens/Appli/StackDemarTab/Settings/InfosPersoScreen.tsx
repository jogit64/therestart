import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useHardwareBackButton } from "../../../../components/useHardwareBackButton";

function InfosPersoScreen({ navigation }) {
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
                <FeatherIcon
                  name="chevron-left"
                  style={styles.iconGoBack}
                ></FeatherIcon>
              </View>
            </TouchableOpacity>
            <Text style={styles.infosPersonnelles}>Infos personnelles</Text>
          </View>
          <View style={styles.imageStack}>
            <Image
              source={require("./../../../../assets/userHead.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <View style={styles.groupPhoto1}>
              <View style={styles.ellipsePhoto1Stack}>
                <Svg viewBox="0 0 29.57 29.57" style={styles.ellipsePhoto1}>
                  <Ellipse
                    stroke="rgba(230, 230, 230,1)"
                    strokeWidth={0}
                    fill="rgba(111,120,189,1)"
                    cx={15}
                    cy={15}
                    rx={15}
                    ry={15}
                  ></Ellipse>
                </Svg>
                <EntypoIcon
                  name="camera"
                  style={styles.iconPhoto1}
                ></EntypoIcon>
              </View>
            </View>
          </View>
          <View style={styles.groupName}>
            <Text style={styles.nomDutilisateur}>Nom d&#39;utilisateur</Text>
            <TextInput
              placeholder="Entrez votre nom d'utilisateur"
              dataDetector="address"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputName}
            ></TextInput>
          </View>
          <View style={styles.groupAge}>
            <Text style={styles.age}>Âge</Text>
            <TextInput
              placeholder="Entrez votre âge"
              dataDetector="address"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputAge}
            ></TextInput>
          </View>
          <View style={styles.groupSexe}>
            <Text style={styles.sexe}>Sexe</Text>
            <View style={styles.groupMascuRow}>
              <View style={styles.groupMascu}>
                <TouchableOpacity style={styles.button2}>
                  <MaterialCommunityIconsIcon
                    name="gender-male"
                    style={styles.iconMascu}
                  ></MaterialCommunityIconsIcon>
                  <Text style={styles.masculin}>Masculin</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.groupFemin}>
                <TouchableOpacity style={styles.button3}>
                  <MaterialCommunityIconsIcon
                    name="gender-female"
                    style={styles.iconFemin}
                  ></MaterialCommunityIconsIcon>
                  <Text style={styles.feminin}>Féminin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("MonProfil")}
            style={styles.groupPasDire}
          >
            <TouchableOpacity style={styles.buttonPasDire}>
              <Text style={styles.labelPasDire}>Je préfère ne pas le dire</Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
    flex: 1,
    marginTop: 22,
  },
  scrollArea_contentContainerStyle: {},
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
  infosPersonnelles: {
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
    marginRight: 105,
  },
  image: {
    top: 0,
    left: 0,
    width: 91,
    height: 91,
    position: "absolute",
  },
  groupPhoto1: {
    top: 63,
    left: 67,
    width: 34,
    height: 34,
    position: "absolute",
  },
  ellipsePhoto1: {
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    position: "absolute",
  },
  iconPhoto1: {
    top: 6,
    left: 7,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
  ellipsePhoto1Stack: {
    width: 30,
    height: 30,
  },
  imageStack: {
    width: 101,
    height: 97,
    marginTop: 13,
    marginLeft: 135,
  },
  groupName: {
    width: 298,
    height: 70,
    marginTop: 27,
    marginLeft: 27,
  },
  nomDutilisateur: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputName: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 8,
    paddingLeft: 10,
  },
  groupAge: {
    width: 302,
    height: 69,
    marginTop: 29,
    marginLeft: 27,
  },
  age: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputAge: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    marginLeft: 4,
    paddingLeft: 10,
  },
  groupSexe: {
    width: 298,
    height: 141,
    marginTop: 33,
    marginLeft: 27,
  },
  sexe: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  groupMascu: {
    width: 138,
    height: 113,
  },
  button2: {
    width: 136,
    height: 111,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11,
    shadowColor: "rgba(225,229,245,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  iconMascu: {
    color: "rgba(141,151,248,1)",
    fontSize: 40,
    height: 43,
    width: 40,
    marginTop: 13,
    marginLeft: 48,
  },
  masculin: {
    fontFamily: "roboto",
    color: "rgba(52,56,104,1)",
    marginTop: 14,
    marginLeft: 39,
  },
  groupFemin: {
    width: 138,
    height: 113,
    marginLeft: 14,
  },
  button3: {
    width: 136,
    height: 110,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11,
    shadowColor: "rgba(225,229,245,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    marginTop: -1,
  },
  iconFemin: {
    color: "rgba(141,151,248,1)",
    fontSize: 40,
    height: 43,
    width: 40,
    marginTop: 13,
    marginLeft: 48,
  },
  feminin: {
    fontFamily: "roboto",
    color: "rgba(52,56,104,1)",
    marginTop: 15,
    marginLeft: 43,
  },
  groupMascuRow: {
    height: 113,
    flexDirection: "row",
    marginTop: 9,
    marginLeft: 8,
  },
  groupPasDire: {
    width: 290,
    height: 57,
    overflow: "visible",
    marginTop: 23,
    marginLeft: 35,
  },
  buttonPasDire: {
    width: 290,
    height: 55,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11,
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 3,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  labelPasDire: {
    fontFamily: "roboto",
    color: "rgba(128,131,148,1)",
    marginTop: 20,
    marginLeft: 78,
  },
  groupSauvegarder: {
    width: 290,
    height: 57,
    overflow: "visible",
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 12,
    marginLeft: 35,
    marginBottom: 50,
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

export default InfosPersoScreen;
