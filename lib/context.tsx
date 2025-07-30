import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { Alert } from 'react-native';
import {FIREBASE_API_KEY, APP_BASE_URL} from "@env";

const AuthContext = createContext<{
  signIn: ({uid} : {uid: string}) => void;
  saveToken: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  token?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  saveToken: () => null,
  session: null,
  token: null,
  isLoading: false,
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
        session,
        token,
        isLoading,
      }}>
      {children}
    </AuthContext>
  );
}
