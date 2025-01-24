export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

export type UserRole = 'EndUser' | 'Approver' | 'Finance';