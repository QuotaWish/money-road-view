export interface IUserInfo {
  name: string | null;
  id: string;
  role: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}