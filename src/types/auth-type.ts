export enum UserAuthProvider {
  SELF = 'SELF',
  GOOGLE = 'GOOGLE',
}

export enum UserAccountType {
  FREE = 'FREE',
  PRO = 'PRO',
}

export type User = {
  id: string;
  email: string;
  displayName: string;
  profileUrl: string;
  accountType: UserAccountType;
  provider: UserAuthProvider;
  createdAt: Date;
};
