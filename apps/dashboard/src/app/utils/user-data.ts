import { User } from '../models/user.model';

export const USERS:User[] = [
  {
    id: 1,
    username: 'enduser',
    password: 'enduser',
    role: 'EndUser',
    permissions: ['CanCreateTrip', 'SendForApproval']
  },
  {
    id: 2,
    username: 'approver',
    password: 'approver',
    role: 'Approver',
    permissions: ['CanApproveTrip']
  },
  {
    id: 3,
    username: 'finance',
    password: 'finance',
    role: 'Finance',
    permissions: ['CanManageFinance']
  },
];
