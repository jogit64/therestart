// Importer les dépendances requises de React
import React, { createContext, useState, ReactNode } from "react";
import { User } from "./types";

export interface UserContextInterface {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  imageUrl: string | null; // Ajoutez cette ligne
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>; // Ajoutez cette ligne
}

// Créer le contexte avec une valeur initiale
const UserContext = createContext<UserContextInterface | null>(null);

// Définir les props pour UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// Créer le provider de contexte. C'est un composant qui enveloppera d'autres composants
// et leur fournira l'accès au contexte de l'utilisateur.
export const UserProvider = ({ children }: UserProviderProps) => {
  // Utiliser l'hook useState pour gérer l'information de l'utilisateur
  const [user, setUser] = useState<User>({
    basicInfo: {
      firstName: "",
      email: "", // Initialisez cela aussi à une chaîne vide
    },
    extraInfo: {
      isLoggedIn: false,
      imageUrl: null,
      age: null,
      sex: null,
    },
  });

  // Ajoutez un nouvel état pour gérer imageUrl
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Renvoyer le provider de contexte. Les valeurs qui peuvent être utilisées par
  // les composants enfants sont passées au provider via la prop value.
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        imageUrl, // Ajoutez cette ligne
        setImageUrl, // Ajoutez cette ligne
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Exporter UserContext pour qu'il puisse être utilisé par d'autres composants
export default UserContext;
