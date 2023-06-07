import React, { useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";

const SettingsScreen = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  const animateButton = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const buttonStyle = {
    width: "80%",
    height: 50,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    overflow: "hidden",
  };

  const fillStyle = {
    position: "absolute",
    backgroundColor: "#EE82EE",
    width: "100%",
    height: "100%",
    transform: [
      {
        scaleX: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Pressable onPressIn={animateButton} style={buttonStyle}>
        <Animated.View style={fillStyle} />
        <Text style={{ textAlign: "center", color: "white" }}>Bouton test</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
