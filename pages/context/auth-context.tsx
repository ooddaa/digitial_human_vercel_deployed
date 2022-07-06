/**
 * @deprecated quicker than it became useful =) 
 * 
 * I was trying to protect API routes by providing app with
 * context that would tell each page if the request came 
 * from an authorized user. I'd store JWE token in local or session
 * storage.
 * 
 * Turned out that on successful authorization NextAuth sets 
 * CSRF Token in cookies, so it's available on client/server 
 * via getCsrfToken() hook.
 * 
 * @see https://next-auth.js.org/getting-started/client#getcsrftoken
 * 
 * @todo refactor this pattern to use as custom context providers later.
 */
import { useState, createContext } from "react";

const AuthContext = createContext<AuthContextProps | null>(null);
const { Provider } = AuthContext;

interface AuthContextProps {
  authState: AuthStateProps,
  setAuthState: (userAuthInfo: AuthStateProps) => void
  isAuthenticated: () => boolean
}
interface AuthProviderProps {
  children: JSX.Element | JSX.Element[]
}
interface AuthStateProps {
  token: string|null
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthStateProps>({ token: null })

  const setUserAuthInfo = ({ token }: AuthStateProps): void => {
    /** persists token in localStorage 
     * @todo or sessionStorage
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
     * make it safer with sessionStorage? or just more annoying coz will ask to login every time user closes browser tab.
    */
    if (token === null) {
      throw new Error(`AuthProvider.setUserAuthInfo: token is null.\ntoken: ${JSON.stringify(token, null,4)}`)
    }

    console.log('setting token to localStorage', token)
    // localStorage.setItem("token", token)

    /* set auth state */
    setAuthState({ token })
  }

  const isAuthenticated = () => !!authState.token

  return <Provider value={{
    authState,
    setAuthState: (userAuthInfo: AuthStateProps) => setUserAuthInfo(userAuthInfo),
    isAuthenticated
  }}>
    {children}
  </Provider>
}

export { AuthContext, AuthProvider }