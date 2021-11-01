import { config } from "dotenv";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface UserSocials {
  socials: [
    {
      github: string;
      twitter: string | null;
      youtube: string | null;
      lkdin: string | null;
    }
  ];
}

interface User extends UserSocials {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface AuthContextData {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProvider {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
  user: User;
}

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${
    import.meta.env.VITE_CLIENT
  }`;

  async function signIn(githubCode: string) {
    const res = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = res.data;
    localStorage.setItem("@dowhile:token", token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(() => user);
  }

  function signOut() {
    setUser(() => null);
    localStorage.removeItem("@dowhile:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("profile").then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
