import { Trip } from '../models/trip.model';

export const TRIPS: Trip[] = [
  {
    id: 1,
    userId:1,
    name: "Trip 1",
    duration: 10,
    setForApproval:false,
    startDate: new Date("2025-01-25"),
    endDate: new Date("2025-02-04"),
  },
  {
    id: 2,
    userId:1,
    name: "Trip 2",
    duration: 7,
    setForApproval:false,
    startDate: new Date("2025-01-30"),
    endDate: new Date("2025-02-06"),
  },
  {
    id: 3,
    userId:2,
    name: "Trip 3",
    duration: 5,
    setForApproval:false,
    startDate: new Date("2025-02-04"),
    endDate: new Date("2025-02-09"),
  },
];
