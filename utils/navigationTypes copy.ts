export type RootStackParamList = {
  Accueil: undefined;
  Login: undefined;
  SignUp: undefined;
  BottomTabNavigator: TabParamList;
  Politique: undefined;
};

export type TabParamList = {
  Accueil: undefined | { screen: keyof Tab1ParamList };
  Tab2: undefined;
  Tab3: undefined;
  Tab4: undefined;
};

export type Tab1ParamList = {
  Tab1Home: undefined;
  Settings: undefined;
  InfosPerso: undefined;
  MonProfil: undefined;
  Contact: undefined;
  Faq: undefined;
  Tutoriel: undefined;
  ChangePassword: undefined;
};
