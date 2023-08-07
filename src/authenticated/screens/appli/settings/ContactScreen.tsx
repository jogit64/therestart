import React, { Component, useState } from "react";
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
import { useHardwareBackButton } from "components/useHardwareBackButton";
import { StatusBarCustom } from "components/StatusBarCustom";

import {
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../../../../utils/firebase.js";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../utils/navigationTypes";

type ContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Contact"
>;

export default function ContactScreen() {
  useHardwareBackButton();
  const navigation = useNavigation<ContactScreenNavigationProp>();

  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageLength, setMessageLength] = React.useState(0); // New state to hold the message length

  const activeButtonStyle = {
    ...styles.buttonEnvoyer,
    backgroundColor: "rgba(111,120,189,1)", // active color
  };
  const inactiveButtonStyle = {
    ...styles.buttonEnvoyer,
    backgroundColor: "#dcdeeb", // inactive color
  };

  const handleContactSubmit = async () => {
    if (messageLength < 10 || messageLength > 400) {
      // Display a toast message when message length is not valid
      Toast.show("Votre message doit contenir entre 10 et 400 caractères.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "contactMessages"), {
        subject: subject,
        message: message,
        userId: auth.currentUser!.uid, // Ici, nous utilisons l'opérateur d'affirmation non-null pour dire à TypeScript que auth.currentUser n'est pas null
        userEmail: auth.currentUser!.email,
        timestamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);

      // Afficher un message Toast de confirmation
      Toast.show("Votre message a été envoyé avec succès.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      // Rediriger vers la page de profil
      navigation.navigate("Settings");
    } catch (e) {
      console.error("Error adding document: ", e);

      // Afficher un message Toast d'erreur
      Toast.show("Une erreur s'est produite lors de l'envoi du message.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="rgba(0,0,0,1)" /> */}
      <StatusBarCustom />
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
                {/* <Icon name="chevron-left" style={styles.iconGoBack}></Icon> */}
                <Icon name="chevron-left" style={styles.iconGoBack}></Icon>
              </View>
            </TouchableOpacity>
            <Text style={styles.nousContacter}>Nous contacter</Text>
          </View>
          <View style={styles.groupSujet}>
            <Text style={styles.sujet}>Sujet</Text>
            <TextInput
              placeholder="Entrez votre sujet"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              style={styles.inputSujet}
              value={subject}
              onChangeText={setSubject}
            ></TextInput>
          </View>
          <View style={styles.groupMessage}>
            <Text style={styles.message}>
              Message{" "}
              <Text style={styles.longMessage}>
                (Nb. car. : {messageLength})
              </Text>
            </Text>
            <TextInput
              placeholder="Entrez votre message ici - entre 10 et 400 caractères"
              placeholderTextColor="rgba(151,155,180,1)"
              inlineImagePadding={0}
              textBreakStrategy="simple"
              clearTextOnFocus={false}
              multiline={true}
              selectTextOnFocus={true}
              textAlignVertical="top"
              style={styles.inputMessage}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                setMessageLength(text.length); // Update the message length each time the text changes
              }}
            ></TextInput>
          </View>

          <View
            style={[
              styles.groupEnvoyer,
              {
                backgroundColor:
                  messageLength >= 10 && messageLength <= 400
                    ? "rgba(111,120,189,1)"
                    : "#dcdeeb",
              },
            ]}
          >
            <TouchableOpacity
              onPress={handleContactSubmit}
              disabled={messageLength < 10 || messageLength > 400}
              style={
                messageLength >= 10 && messageLength <= 400
                  ? styles.activeButtonEnvoyer
                  : styles.inactiveButtonEnvoyer
              }
            >
              <Text style={styles.envoyer}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "rgba(236,246,255,1)",
    backgroundColor: "#6f78bd",
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
    minHeight: 295,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    marginLeft: 2,
    paddingLeft: 10,
    paddingTop: 10,
  },

  groupEnvoyer: {
    width: 290,
    height: 57,
    overflow: "visible",
    // backgroundColor: "rgba(255,255,255,1)",
    marginTop: 275,
    marginLeft: 35,
    borderRadius: 11,
  },
  buttonEnvoyer: {
    width: 290,
    height: 55,
    //  backgroundColor: "rgba(111,120,189,1)",
    //borderRadius: 11,
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
  envoyer: {
    fontFamily: "roboto500",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    textAlign: "center",
  },
  longMessage: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 14,
    textAlign: "center",
  },

  activeButtonEnvoyer: {
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
  inactiveButtonEnvoyer: {
    width: 290,
    height: 55,
    backgroundColor: "#dcdeeb",
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
});
