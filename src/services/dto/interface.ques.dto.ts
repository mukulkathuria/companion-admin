export type ProcessQueDto = {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
  };
  
  export type RefreshTokenDto = {
    access_token: string;
    refresh_token: string;
  };
  
  export type TokenDto = {
    exp: number | string;
    name: string;
    email: string;
  };

  export type getAccessTokenFromRefreshTokenDto = {
    access_token: string;
  }