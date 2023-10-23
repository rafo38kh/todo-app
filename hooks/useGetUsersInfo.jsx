export const useGetUsersInfo = () => {
  if (JSON.parse(localStorage.getItem("auth"))) {
    const { userID, name, profilePhoto, isAuth } = JSON.parse(
      localStorage.getItem("auth")
    );
    return { userID, name, profilePhoto, isAuth };
  }

  return {};
};
