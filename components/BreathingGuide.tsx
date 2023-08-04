import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const BreathingGuide = () => {
  const [count, setCount] = useState(1);
  const [isInhaling, setIsInhaling] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isInhaling) {
        setCount((prevCount) => prevCount + 1);
        if (count === 5) {
          setIsInhaling(false);
          setCount(5);
        }
      } else {
        setCount((prevCount) => prevCount - 1);
        if (count === 1) {
          setIsInhaling(true);
          setCount(1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count, isInhaling]);

  return (
    <View
      style={[
        styles.buttonRespi,
        { backgroundColor: isInhaling ? "#ffd369" : "#a4c763" },
      ]}
    >
      <Text style={styles.text}>
        {isInhaling ? "Inspirez" : "Expirez"}: {count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRespi: {
    padding: 10,
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 15,
    width: "99%",
    height: 45,
  },
  text: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "rgba(50,56,106,1)",
    alignSelf: "center",
  },
});

export default BreathingGuide;
