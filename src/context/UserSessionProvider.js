import { useState, useEffect } from "react";
import firebaseApp from "../config/firebase";
import UserSessionContext from "./UserSession";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default function UserSessionProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userLogged) => {
      if (userLogged) {
        setUser(userLogged);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <UserSessionContext.Provider value={{user, auth}}>
      {children}
    </UserSessionContext.Provider>
  );
}
