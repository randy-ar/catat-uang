import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { Alert } from 'react-native';
import {FIREBASE_API_KEY, APP_BASE_URL} from "@env";
import { boolean } from 'zod';
import { fi } from 'zod/v4/locales';

const AuthContext = createContext<{
  signIn: ({uid} : {uid: string}) => void;
  saveToken: (token: string) => void;
  signOut: () => void;
  doneJourney: () => void;
  setLang: (lang: string) => void;
  session?: string | null;
  token?: string | null;
  firstTime?: string | null;
  isLoading: boolean;
  isLoadingFirstTime: boolean;
  lang: string | null;
}>({
  signIn: () => null,
  signOut: () => null,
  saveToken: () => null,
  doneJourney: () => null,
  setLang: () => null,
  session: null,
  token: null,
  firstTime: null,
  isLoading: false,
  isLoadingFirstTime: false,
  lang: "en",
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[isLoadingToken, token], setToken] = useStorageState('token');
  const [[isLoadingFirstTime, firstTime], setFirstTime] = useStorageState('firstTime');
  const [[isLoadingLang, lang], setLang] = useStorageState('lang');
  console.log("First Time (useStorageState): ", firstTime);

  return (
    <AuthContext
      value={{
        signIn: ({uid}) => {
          console.log(uid);
          // Perform sign-in logic here
          setSession(uid);
        },
        saveToken: (token) => {
          setToken(token);
        },
        signOut: () => {
          setSession(null);
          setToken(null);
        },
        doneJourney: () => {
          setFirstTime("false");
          console.log("First Time: ", firstTime);
        },
        setLang: (lang) => {
          setLang(lang);
        },
        session,
        token,
        firstTime,
        isLoading,
        isLoadingFirstTime,
        lang,
      }}>
      {children}
    </AuthContext>
  );
}
