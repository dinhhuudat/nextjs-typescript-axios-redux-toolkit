export type authContextType = {
  user: boolean;
  login: () => void;
  logout: () => void;
};
