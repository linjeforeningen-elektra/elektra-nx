export interface ApiEnvironment {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    syncronize: boolean;
  };
}
