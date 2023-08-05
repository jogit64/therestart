import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const YouTubeVideos = () => {
  const videoIds = ["Bg7-T4TalO4", "Bg7-T4TalO4", "Bg7-T4TalO4", "Bg7-T4TalO4"];

  return (
    <ScrollView horizontal={true} style={styles.videoScroll}>
      {videoIds.map((videoId, index) => (
        <View key={index} style={styles.videoContainer}>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
            style={styles.video}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  videoScroll: {
    flexDirection: "row",
  },
  videoContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    marginVertical: 50,
    width: 250,
    height: 150,
    backgroundColor: "green",
  },
  video: {
    height: "100%",
  },
});

export default YouTubeVideos;
