export type AuthConfig = {
  jwt_expiry: string;
  jwt_secret: string;
  bcrypt_rounds: number;
};

export const AuthConfig = 'elektra-nx.auth-config';
