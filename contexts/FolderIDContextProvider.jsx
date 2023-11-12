"use client";
import { useState, createContext, useMemo } from "react";

export const FolderIDContext = createContext({
  folderID: null,
  setFolderID: () => {},
});

const FolderIDContextProvider = ({ children }) => {
  const [folderID, setFolderID] = useState("");

  const value = useMemo(
    () => ({
      folderID,
      setFolderID,
    }),
    [folderID, setFolderID]
  );

  return (
    <FolderIDContext.Provider value={value}>
      {children}
    </FolderIDContext.Provider>
  );
};

export default FolderIDContextProvider;
