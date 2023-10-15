export const useGetUsersInfo = () => {
  const { userID, name, profilePhoto, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { userID, name, profilePhoto, isAuth };
};
