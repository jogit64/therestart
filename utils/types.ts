// types.ts
export interface BasicUserInfo {
  firstName: string;
  email: string; // Vous voudrez probablement ajouter cela si vous avez un champ email dans votre formulaire d'inscription
}

export interface ExtraUserInfo {
  isLoggedIn: boolean;
  imageUrl: string | null;
  age: number | null;
  sex: string | null;
}

export interface User {
  basicInfo: BasicUserInfo;
  extraInfo: ExtraUserInfo;
}
