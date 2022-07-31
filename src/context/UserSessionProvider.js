import { useState, useEffect } from "react";
import firebaseApp from "../config/firebase";
import UserSessionContext from "./UserSession";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default function UserSessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (userLogged) => {
      if (userLogged) {
        setUser(userLogged);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unSubscribe;
  }, []);

  return (
    <UserSessionContext.Provider value={{ user, auth, isLoading }}>
      {children}
    </UserSessionContext.Provider>
  );
}
