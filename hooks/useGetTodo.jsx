import { useState, useEffect, useContext } from "react";
import { collection, query, orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import { db } from "@/config/firebase";

import { useGetUsersInfo } from "./useGetUsersInfo";

import { FolderIDContext } from "@/contexts/FolderIDContextProvider";

export const useGetTodo = (folderId) => {
  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);

  const { folderID } = useContext(FolderIDContext);

  const { userID } = useGetUsersInfo();

  const retrieveFoldersData = () => {
    const foldersCollectionRef = collection(db, "folders");

    const sortedFoldersQuery = query(
      foldersCollectionRef,
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(sortedFoldersQuery, (snapshot) => {
      const folderNames = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFolders(folderNames);
    });

    return unsubscribe;
  };

  const getAllTodos = (folderId) => {
    const todosCollectionRef = collection(db, "folders", folderId, "todos");

    const unsubscribe = onSnapshot(todosCollectionRef, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos(todosData);
    });

    return unsubscribe;
  };

  useEffect(() => {
    let getAllTodosUnsubscribe;

    if (userID && folderID) {
      getAllTodosUnsubscribe = getAllTodos(folderID);
    }

    return () => {
      if (getAllTodosUnsubscribe) {
        getAllTodosUnsubscribe();
      }
    };
  }, [folderID]);

  useEffect(() => {
    let retrieveFoldersDataUnsubscribe;

    if (userID) {
      retrieveFoldersDataUnsubscribe = retrieveFoldersData();
    }

    return () => {
      if (retrieveFoldersDataUnsubscribe) {
        retrieveFoldersDataUnsubscribe();
      }
    };
  }, []);

  return { todos, setTodos, folders };
};
