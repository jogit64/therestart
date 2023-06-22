// * 1/ Dans LoginScreen, supprimer cgu

{
  /* // ! text et liens CGU */
}
<TouchableOpacity onPress={() => navigation.navigate("CGU")}>
  <Text style={authStyles.textCGU}>
    En vous connectant, vous acceptez nos{"\n"}
    <Text
      style={authStyles.linkText}
      onPress={() => navigation.navigate("CGU")}
    >
      conditions générales
    </Text>{" "}
    et{" "}
    <Text
      style={authStyles.linkText}
      onPress={() => navigation.navigate("Politique")}
    >
      politique de confidentialité
    </Text>
  </Text>
</TouchableOpacity>;

// * 2/ IDEM dans SignupScreen, supprimer cgu

// * 3/ Dans FaqScreen INFO : mise en comment de infopersonnelles en double
// infosPersonnelles: {
//   fontFamily: "roboto700",
//   color: "rgba(50,56,106,1)",
//   fontSize: 20,
//   marginTop: 15,
//   textAlign: "center",
// },
