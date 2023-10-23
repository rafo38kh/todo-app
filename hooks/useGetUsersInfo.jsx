export const useGetUsersInfo = () => {
  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("auth"))) {
      const { userID, name, profilePhoto, isAuth } = JSON.parse(
        localStorage.getItem("auth")
      );
      return { userID, name, profilePhoto, isAuth };
    }
  }

  return {};
};
