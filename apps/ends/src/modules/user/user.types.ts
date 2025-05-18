export interface IUserInfo {
  name: string | null;
  id: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}