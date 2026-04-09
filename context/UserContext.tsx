import React, { createContext, ReactNode, useContext, useState } from "react";

type UserData = {
  name: string;
  email: string;
  career: string;
  semester: string;
};

type UserContextType = {
  user: UserData;
  setUser: (value: UserData) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUser: UserData = {
  name: "",
  email: "",
  career: "",
  semester: "",
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }

  return context;
};