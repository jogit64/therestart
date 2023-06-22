import { StyleSheet } from "react-native";

export default Tab1Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },

  rect1_imageStyle: {
    height: 280,
    resizeMode: "contain",
    alignItems: "center",
  },

  bonjour1Stack: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  firstname: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginLeft: 5,
    flexShrink: 1,
  },
  bonjour1: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
  },

  ellipseFondIcon1: {
    left: 0,
    width: 29,
    height: 29,
    position: "absolute",
  },

  iconSettings1: {
    top: 3,
    left: 3,
    position: "absolute",
    color: "rgba(111,120,189,1)",
    fontSize: 22,
  },

  ellipseFondIcon1Stack: {
    width: 29,
    height: 29,
  },

  bonjour1StackRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    paddingLeft: 0,
  },

  iconContainer: {
    position: "absolute",
    right: 10,
  },

  groupUser2group: {
    width: 112,
    height: 105,
    marginTop: 30,
    marginLeft: 124,
  },

  groupUserFon2Ronds: {
    width: 112,
    height: 105,
  },

  rondUsercontour1: {
    width: 112,
    height: 105,
    borderRadius: 100,
    shadowColor: "rgba(220,225,244,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 66,
    shadowOpacity: 1,
    shadowRadius: 22,
    overflow: "hidden",
  },

  rondUsercontour1_imageStyle: {},
  rondUsercontour: {
    width: 85,
    height: 80,
    borderRadius: 100,
    shadowColor: "rgba(220,225,244,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 24,
    shadowOpacity: 1,
    shadowRadius: 8,
    overflow: "hidden",
    marginTop: 13,
    marginLeft: 13,
  },

  rondUsercontour_imageStyle: {},
  groupUserElilipse: {
    width: 67,
    height: 67,
    marginTop: 6,
    marginLeft: 9,

    elevation: 160,
    shadowOpacity: 1,
    shadowRadius: 20,
    overflow: "hidden",
  },

  ellipseUser: {
    top: 0,
    left: 0,
    width: 67,
    height: 67,
    position: "absolute",
  },

  iconUser: {
    top: 11,
    left: 14,
    position: "absolute",
    color: "rgba(220,222,235,1)",
    fontSize: 40,
  },

  ellipseUserStack: {
    width: 67,
    height: 67,
  },
});
