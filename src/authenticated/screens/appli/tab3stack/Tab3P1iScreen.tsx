// Tab3p1i.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tab3ParamList } from "../../../../../utils/navigationTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import AppIntroSlider from "react-native-app-intro-slider";
import { ScrollView } from "react-native-gesture-handler";

export default function Tab3P1i() {
  const navigation =
    useNavigation<StackNavigationProp<Tab3ParamList, "Tab3P1i">>();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons
          name="information-outline"
          size={40}
          //color="rgba(50,56,106,1)"
          color="white"
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.btnFermer}>Fermer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.firstPartContainer}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sstitleScreen}>L'observation détachée</Text>
            <Text style={styles.sstitleScreen}>
              et la régulation émotionnelle
            </Text>
          </View>

          {/* <Text style={styles.sstitleScreen}>Introduction</Text> */}
          <Text style={styles.textInter}>
            Chaque émotion que nous ressentons, chaque pensée qui traverse notre
            esprit, est influencée par des croyances souvent profondément
            ancrées en nous. {"\n"}
            {"\n"}Ces croyances, parfois limitantes, peuvent engendrer une
            charge émotionnelle considérable. {"\n"}
            {"\n"}Cependant, l'hypothèse ici est que{" "}
            <Text style={styles.boldText}>
              l'émotion est la traduction corporelle d'une pensée, elle-même le
              fruit d'une croyance souvent inconsciente.
            </Text>
            {"\n"}
            {"\n"}Et bien que la pensée et l'émotion soient souvent autonomes et
            échappent à notre contrôle direct, il existe des moyens d'interagir
            avec elles pour notre bien-être.
          </Text>

          <View style={styles.titleParaContainer}>
            <Text style={styles.titlePara}>L'observation détachée</Text>
            <Text style={styles.sstitlePara}>
              Prise de distance et désidentification
            </Text>
          </View>

          {/* <View style={styles.textInter}> */}
          <Text style={styles.titletTextInter}>Hypothèse</Text>
          <Text style={styles.textInter}>
            Nos croyances définissent nos pensées, lesquelles façonnent à leur
            tour nos émotions. {"\n"}
            {"\n"}En remettant en question ces croyances fondamentales, nous
            avons le potentiel d'influencer l'ensemble de ce processus.
          </Text>

          <Text style={styles.titletTextInter}>Méthode</Text>
          <Text style={styles.textInter}>
            Cette approche encourage une prise de distance par rapport à nos
            croyances, en mettant en lumière leurs limitations. En comprenant
            que nos pensées émergent spontanément, fonctionnant selon une
            dynamique autonome influencée par des croyances actives, interroger
            ces croyances permet non seulement de les neutraliser, rendant ainsi
            leur influence moins prédominante, mais aussi de diminuer la
            production de pensées associées. Cette neutralisation facilite
            ensuite la désidentification à ces pensées.
          </Text>
          <Text style={styles.titletTextInter}>Finalité</Text>
          <Text style={styles.textInter}>
            En parvenant à prendre du recul face à une croyance et à en
            reconnaître ses limites, nous accédons à un état de sérénité
            transcendant les turbulences des pensées. Cet état nous ramène à
            l'instant présent, nous permettant d'expérimenter le monde
            directement, sans les filtres de l'interprétation.
          </Text>
          {/* </View> */}

          <View style={styles.titleParaContainer}>
            <Text style={styles.titlePara}>La régulation émotionnelle</Text>
            <Text style={styles.sstitlePara}>Le remplacement émotionnel</Text>
          </View>
          {/* <View style={styles.textInter}> */}
          <Text style={styles.titletTextInter}>Hypothèse</Text>
          <Text style={styles.textInter}>
            Face à une émotion négative, la confrontation directe s'avère
            souvent inefficace. Toutefois, il est postulé que l'évocation
            d'émotions positives opposées peut permettre d'équilibrer ou de
            contrebalancer cette négativité.
          </Text>

          <Text style={styles.titletTextInter}>Méthode</Text>
          <Text style={styles.textInter}>
            Au lieu de chercher à éradiquer une émotion négative, cette approche
            vise à provoquer une émotion positive qui, par sa présence, prend le
            dessus sur l'émotion négative. C'est une nuance subtile : il ne
            s'agit pas de supprimer l'émotion négative elle-même, mais de faire
            émerger une émotion positive qui, dans notre perception, la
            remplace. Cette émotion positive peut être suscitée en se remémorant
            des moments joyeux, des souvenirs insouciants ou des instants de
            bonheur intense. Il est essentiel de se rappeler que le cerveau,
            dans sa traduction émotionnelle, ne distingue pas si une pensée
            provient d'une réalité extérieure ou est simplement imaginée.
            Autrement dit, nous pouvons ressentir des émotions réelles
            simplement en évoquant des souvenirs ou en imaginant des situations.
          </Text>
          <Text style={styles.titletTextInter}>Astuce</Text>
          <Text style={styles.textInter}>
            Pour profiter pleinement des efforts investis dans cette méthode,
            n'oubliez pas de mettre de côté les souvenirs ou les moments
            puissamment évocateurs d'émotions positives, afin de les "planter"
            et de les "arroser" régulièrement dans votre "Jardin" personnel.
            Ceci permet de les maintenir vivants et facilement accessibles.
          </Text>
          {/* </View> */}
          <View style={styles.scrollFooter}></View>
          {/* <Text style={styles.sstitleScreen}>Conclusion</Text>
          <Text style={styles.textInter}>
            La complexité de notre réalité émotionnelle est influencée ...
          </Text> */}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //backgroundColor: "white",
    //backgroundColor: "#f5f6fa",
    //  backgroundColor: "red",
    //paddingHorizontal: 20,
    //paddingTop: 20,
    //paddingBottom: 50,
    //marginBottom: 60,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#6f78bd",
    backgroundColor: "rgba(190,205,224,0.67)",
    //backgroundColor: "green",
    paddingTop: 35,
    //marginBottom: 20,
    // marginTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    //marginBottom: 30,
  },

  btnFermer: {
    fontFamily: "roboto",
    fontSize: 16,
    //textAlign: "center",
    color: "rgba(50,56,106,1)",
    //color: "#6f78bd",
    //color: "white",
    //paddingLeft: 10,
    //  marginBottom: 15,
    marginRight: 10,
  },

  headerContainer: {
    //flexGrow: 1,
    //height: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#6f78bd",
    //backgroundColor: "rgba(190,205,224,0.67)",
    //paddingTop: 25,
    // marginBottom: 20,
    // marginTop: 20,
    //paddingLeft: 20,
    paddingVertical: 15,
    //borderRadius: 15,
  },

  firstPartContainer: {
    //flexGrow: 1,
    //backgroundColor: "#6f78bd",
    //paddingHorizontal: 20,
    // marginTop: 25,
    //paddingBottom: 150,
    //marginBottom: 20,
  },

  scrollContainer: {
    //flexGrow: 1,
    // backgroundColor: "#6f78bd",
    //paddingHorizontal: 20,
    // marginTop: 25,
    //paddingBottom: 280,
    //marginBottom: 100,
  },

  scrollFooter: {
    //flexGrow: 1,
    //backgroundColor: "red",
    //paddingHorizontal: 20,
    // marginTop: 25,
    paddingBottom: 120,
    //marginBottom: 20,
  },

  // titleScreen: {
  //   fontFamily: "roboto700",
  //   fontSize: 22,
  //   textAlign: "center",
  //   color: "rgba(50,56,106,1)",
  //   paddingLeft: 10,
  //   //  marginBottom: 15,
  // },

  sstitleScreen: {
    fontFamily: "roboto500",
    fontSize: 18,
    //textAlign: "center",
    color: "rgba(50,56,106,1)",
    //paddingLeft: 10,
    //  marginBottom: 15,
  },

  titlePara: {
    fontFamily: "roboto500",
    fontSize: 18,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    //paddingLeft: 10,
    //  marginBottom: 15,
    //paddingVertical: 20,
    //paddingTop: 20,
  },

  sstitlePara: {
    fontFamily: "roboto",
    fontSize: 16,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    //paddingLeft: 10,
    //marginBottom: 15,
    paddingVertical: 5,
  },

  titletTextInter: {
    fontFamily: "roboto500",
    color: "rgba(151,155,180,1)",
    //color: "#f6e482",
    //lineHeight: 25,
    //paddingHorizontal: 10,
    alignSelf: "center",
    fontSize: 16,
    marginTop: 20,
  },

  titleParaContainer: {
    //backgroundColor: "rgba(190,205,224,0.67)",
    // backgroundColor: "#f6e482",
    //paddingTop: 25,
    // marginBottom: 20,
    marginTop: 35,
    paddingLeft: 20,
    paddingVertical: 15,
    //borderRadius: 15,
  },

  textInter: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    //color: "white",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 14,
  },

  boldText: {
    fontWeight: "bold",
  },
});
