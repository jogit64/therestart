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

import { useHardwareBackButton } from "../../components/useHardwareBackButton";

export default function CGUScreen({ navigation }) {
  useHardwareBackButton();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,1)" />
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
        <Text style={styles.conditionsGeneral}>
          Conditions Générales d'Utilisation
        </Text>
      </View>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollArea_contentContainerStyle}
      >
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed
          massa in ex pretium venenatis. Nulla sed metus ut dui consectetur
          consequat. Maecenas et placerat est. Proin eu diam a nunc feugiat
          efficitur. Sed lacinia sollicitudin metus, nec tincidunt metus feugiat
          nec. In eleifend placerat malesuada. Phasellus vitae tellus mauris.
          Sed facilisis orci et felis placerat, sed dictum metus pulvinar. In
          tristique nisl sed diam fermentum, ut sagittis purus scelerisque.
        </Text>
        <Text style={styles.paragraph}>
          Vestibulum vestibulum, mauris eget dapibus rutrum, nisl nunc congue
          velit, sit amet pulvinar metus lorem nec mauris. Nulla facilisi. Ut
          varius sem eget dui pharetra, sit amet fermentum nisl rutrum. Quisque
          efficitur nulla ac ante commodo facilisis. Donec pretium odio quis
          consectetur consectetur. Integer at felis enim. Ut dapibus eu urna sit
          amet rhoncus. Duis tempus, orci ac venenatis interdum, ex sapien
          convallis dui, nec iaculis nunc purus eu leo.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,246,255,1)",
  },
  goBackButtonRow: {
    height: 65,
    flexDirection: "row",
    marginTop: 46,

    // marginLeft: 19,
    //marginRight: 134,
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
  conditionsGeneral: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5,
    textAlign: "center",
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

  paragraph: {
    fontFamily: "roboto",
    color: "#121212",
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
  },
});

export default CGUScreen;
