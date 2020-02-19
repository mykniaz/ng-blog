export interface User {
  id?: string;
  email: string;
  password: string;
}

export interface FbAuthRequest extends User {
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

export interface Post {
  id?: string;
  title: string;
  text: string;
  author: string;
  date: Date;
}

export interface FbCreateResponse {
  name: string;
}
