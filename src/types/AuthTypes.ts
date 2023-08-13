export enum AuthProvider {
  SELF = 'SELF',
  GOOGLE = 'GOOGLE',
}

export type User = {
  id: string;
  email: string;
  displayName: string;
  profileUrl: string;
  provider: AuthProvider;
  createdAt: Date;
};
