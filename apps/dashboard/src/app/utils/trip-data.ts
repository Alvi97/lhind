import { Trip } from '../models/trip.model';

export enum TripStatus {
  Cancel = 'cancel',
  Approved = 'approved',
  None = '',
}

export enum FinanceStatus {
  Refunded = 'refunded',
  InProcess = 'In process',
  None = '',
}

export const TRIPS: Trip[] = [
  {
    id: 1,
    userId:1,
    name: "Trip 1",
    duration: 10,
    setForApproval:false,
    startDate: new Date(),
    endDate: new Date(),
    note:'',
    status:TripStatus.None,
    financeStatus:FinanceStatus.None
  },
  {
    id: 2,
    userId:1,
    name: "Trip 2",
    duration: 7,
    setForApproval:false,
    startDate: new Date(),
    endDate: new Date(),
    note:'',
    status:TripStatus.None,
    financeStatus:FinanceStatus.None
  },
  {
    id: 3,
    userId:2,
    name: "Trip 3",
    duration: 5,
    setForApproval:false,
    startDate: new Date(),
    endDate: new Date(),
    note:'',
    status:TripStatus.None,
    financeStatus:FinanceStatus.None
  },
];

