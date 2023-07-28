export type RootStackParamList = {
  Accueil: undefined;
  Login: undefined;
  ReinitMdp: undefined;
  SignUp: undefined;
  BottomTabNavigator: undefined | { screen: keyof TabParamList };
  Politique: undefined;
  Settings: undefined;
  InfosPerso: undefined;
  MonProfil: undefined;
  Contact: undefined;
  Faq: undefined;
  Tutoriel: undefined;
  ChangePassword: undefined;
};

export type TabParamList = {
  Accueil: undefined;
  Tab2: undefined;
  //Tab3: undefined;
  Tab4: undefined;
  ScreenRandomMemory: undefined;
  ScreenManageMemory: undefined;
};

export type Tab1ParamList = {
  Tab1P0: undefined;
  Tab1P1: undefined;
  // Settings: undefined;
  // InfosPerso: undefined;
  // MonProfil: undefined;
  // Contact: undefined;
  // Faq: undefined;
  // Tutoriel: undefined;
  // ChangePassword: undefined;
};

export type Tab3ParamList = {
  Tab3P0: undefined;
  Tab3P1: undefined;
  // Settings: undefined;
  // InfosPerso: undefined;
  // MonProfil: undefined;
  // Contact: undefined;
  // Faq: undefined;
  // Tutoriel: undefined;
  // ChangePassword: undefined;
};
