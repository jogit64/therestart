import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PolitiqueScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Politique de Confidentialité</Text>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed
        massa in ex pretium venenatis. Nulla sed metus ut dui consectetur
        consequat. Maecenas et placerat est. Proin eu diam a nunc feugiat
        efficitur. Sed lacinia sollicitudin metus, nec tincidunt metus feugiat
        nec. In eleifend placerat malesuada. Phasellus vitae tellus mauris. Sed
        facilisis orci et felis placerat, sed dictum metus pulvinar. In
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
      {/* Ajoutez d'autres paragraphes ou sections selon vos besoins */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 10,
  },
});

export default PolitiqueScreen;
