// types.ts
export interface BasicUserInfo {
  firstName: string;
  email: string;
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

// Définir le type Memory
export interface Memory {
  id: string;
  text: string;
}

// Définir le type Memories
export interface Memories {
  [category: string]: Memory[];
}
