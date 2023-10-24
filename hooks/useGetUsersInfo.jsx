export const useGetUsersInfo = () => {
  if (typeof window !== "undefined") {
    if (JSON.parse(window.localStorage.getItem("auth"))) {
      const { userID, name, profilePhoto, isAuth } = JSON.parse(
        window.localStorage.getItem("auth")
      );
      return { userID, name, profilePhoto, isAuth };
    }
  }

  return {};
};
