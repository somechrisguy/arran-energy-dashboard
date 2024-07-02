// app/contexts/ViewContext.js
"use client";
import React, { createContext, useState, useContext } from "react";

const ViewContext = createContext();

export function ViewProvider({ children }) {
  const [view, setView] = useState("current");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}
