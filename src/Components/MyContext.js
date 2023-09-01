import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [myState, setMyState] = useState("");

  return (
    <MyContext.Provider value={{ myState, setMyState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};