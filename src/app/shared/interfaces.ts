export interface User {
  id?: string;
  email: string;
  password: string;
}

export interface FbAuthRequest extends User{
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  expiresIn?: string;
}

interface FbAuthErrorResponse {
  code: number;
  message: string;
  errors: Array<{message: string, domain: string, reason: string}>;
}
