import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useBackHandler } from "@react-native-community/hooks";
import { BackHandler } from "react-native";

import { Tab4ParamList } from "../../../utils/navigationTypes";
import Tab4P0Screen from "../screens/appli/tab4stack/Tab4P0Screen";
import Tab4P1Screen from "../screens/appli/tab4stack/Tab4P1Screen";

const Tab4Stack = createStackNavigator<Tab4ParamList>();

function Tab4Navigator() {
  // useBackHandler(() => {
  //   BackHandler.exitApp();
  //   return true;
  // });

  return (
    <Tab4Stack.Navigator
      initialRouteName="Tab4P0"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, // Animation fade
      }}
    >
      <Tab4Stack.Screen
        name="Tab4P0"
        component={Tab4P0Screen}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />

      <Tab4Stack.Screen name="Tab4P1" component={Tab4P1Screen} />
      {/* <Tab4Stack.Screen name="Tab4P1b" component={Tab4P1bScreen} />
      <Tab4Stack.Screen name="Tab4P2" component={Tab4P2Screen} /> */}
    </Tab4Stack.Navigator>
  );
}

export default Tab4Navigator;
