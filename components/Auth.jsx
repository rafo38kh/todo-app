import { useState } from "react";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Auth() {
  //   const [email, setEmail] = useState();
  //   const [password, setPassword] = useState();

  //   const signIn = async () => {
  //     try {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //       setEmail("");
  //       setPassword("");
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, googleProvider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  //   console.log(auth?.currentUser?.email);

  return (
    <div className="flex gap-4 flex-col w-40">
      {/* <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /> */}
      {auth?.currentUser ? (
        <button onClick={logOut}> Log Out</button>
      ) : (
        <div>
          {/* <button onClick={signIn}>Sign in</button> */}
          <button onClick={signInWithGoogle}>Sign in With Google</button>
        </div>
      )}
    </div>
  );
}
