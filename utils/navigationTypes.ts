export type TabParamList = {
  Tab2: undefined;
  Tab3: undefined;
  Tab4: undefined;
};

export type RootStackParamList = {
  Accueil: undefined;
  Login: undefined;
  SignUp: undefined;
  App: { screen: keyof TabParamList }; // Ici, on précise que "App" attend un objet avec la propriété "screen"
  Politique: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  MonProfil: undefined;
  Contact: undefined;
  Faq: undefined;
  InfosPerso: undefined;
  Tutoriel: undefined;
  Tab1: undefined;
};
