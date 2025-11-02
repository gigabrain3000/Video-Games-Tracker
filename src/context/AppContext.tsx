import {
  createContext,
  ReactNode,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { AppContextType, userData } from "@/types/userTypes";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<userData | null>(null);
  const [allUsers, setAllUsers] = useState<userData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        const usersSnapshot: QuerySnapshot<DocumentData, DocumentData> =
          await getDocs(collection(db, "users"));
        const users = usersSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as userData)
        );
        setAllUsers(users);
        const matchedUser = users.find((u) => u.id === user.uid) || null;
        setCurrentUser(matchedUser);
      } else {
        setAllUsers([]);
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }),
    [];
  return (
    <AppContext.Provider value={{ currentUser, allUsers, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
