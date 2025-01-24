export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  permissions: Permission[];
}

export type UserRole = 'EndUser' | 'Approver' | 'Finance';

export type Permission =
  | 'CanCreateTrip'
  | 'CanApproveTrip'
  | 'CanViewTrips'
  | 'CanManageFinance'
  | 'SendForApproval';