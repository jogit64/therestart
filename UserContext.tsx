import React, { createContext, useState } from "react";

interface UserContextInterface {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [firstName, setFirstName] = useState("");

  return (
    <UserContext.Provider value={{ firstName, setFirstName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
