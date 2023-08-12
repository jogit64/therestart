import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    //ici le test du fond en rouge ais qu'on ne voit pas
    backgroundColor: "#f8fcff",
    //alignItems: "stretch",
    //backgroundColor: "red",
    justifyContent: "flex-start",
  },
  gradient: {
    //flex: 1,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    //flex: 1,
    marginTop: 60,
    alignSelf: "center",

    //  marginBottom: 0, // Ajouter une marge inférieure pour éviter le scroll infini
    //maxHeight: "100%", // Utiliser une hauteur maximale
  },

  scrollView: {
    flex: 1,
    //maxHeight: "100%",
  },

  iconContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    //color: "rgba(253,205,1,1)",
    color: "#cddaea",
    fontSize: 45,
    padding: 3,
  },
  titrePrincipal: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 22,
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 14,
    marginTop: 25,
  },
  input: {
    fontFamily: "roboto",
    color: "#121212",
    height: 55,
    width: 260,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    padding: 10,
    marginTop: 10,
  },

  activeInput: {
    borderColor: "#6f78bd",
  },

  inputValid: {
    backgroundColor: "#fffac3",
  },

  buttonCreer: {
    width: 260,
    height: 44,
    backgroundColor: "#dcdeeb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 20,
  },

  buttonActive: {
    backgroundColor: "#6f78bd",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "roboto",
  },
  textDeja: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
  },

  meConnecter: {
    fontFamily: "roboto700",
    color: "#7078b9",
    fontSize: 14,
    //marginTop: -20,
    textAlign: "center",
    marginVertical: 5,
  },

  passForgot: {
    fontFamily: "roboto700",
    color: "#7078b9",
    fontSize: 14,
    //marginTop: -20,
    textAlign: "center",
    marginVertical: 20,
    //marginTop: 10,
  },

  textCGU: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    fontSize: 11,
    textAlign: "center",
    marginTop: 45,
    paddingBottom: 30,
  },

  errorText: {
    color: "#e95120",
    fontSize: 10,
    paddingLeft: 5,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyeButton: {
    position: "absolute",
    right: 10,
    bottom: 11,
  },

  linkText: {
    textDecorationLine: "underline",
  },
});
