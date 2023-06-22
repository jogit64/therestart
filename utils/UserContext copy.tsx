// Importer les dépendances requises de React
import React, { createContext, useState, ReactNode } from "react";

// Définir l'interface pour le contexte de l'utilisateur
interface UserContextInterface {
  firstName: string; // Le prénom de l'utilisateur
  isLoggedIn: boolean; // L'état de connexion de l'utilisateur
  imageUrl: string;
  // Des fonctions pour mettre à jour le prénom et l'état de connexion
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

// Définir le contexte initial
const defaultUserContext: UserContextInterface = {
  firstName: "",
  isLoggedIn: false,
  imageUrl: "",
  setFirstName: () => {},
  setIsLoggedIn: () => {},
  setImageUrl: () => {},
};

// Créer le contexte avec une valeur initiale
const UserContext = createContext<UserContextInterface>(defaultUserContext);

// Définir les props pour UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// Créer le provider de contexte. C'est un composant qui enveloppera d'autres composants
// et leur fournira l'accès au contexte de l'utilisateur.
export const UserProvider = ({ children }: UserProviderProps) => {
  // Utiliser l'hook useState pour gérer le prénom, l'état de connexion, et l'URL de l'image de l'utilisateur
  const [firstName, setFirstName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Renvoyer le provider de contexte. Les valeurs qui peuvent être utilisées par
  // les composants enfants sont passées au provider via la prop value.
  return (
    <UserContext.Provider
      value={{
        firstName,
        setFirstName,
        isLoggedIn,
        setIsLoggedIn,
        imageUrl,
        setImageUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Exporter UserContext pour qu'il puisse être utilisé par d'autres composants
export default UserContext;
