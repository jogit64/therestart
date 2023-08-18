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
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Memory {
  id: string;
  text: string;
  categoryId: string;
}

export type Memories = Record<string, Memory[]>;
